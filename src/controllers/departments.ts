import { Request, Response } from "express"
import { db } from "../db"
import { departments, subjects } from "../db/schema"
import { eq, ilike, or, and, getTableColumns, count, sql, desc } from "drizzle-orm"

// get subject list by search by name or code and department of deparments list
export const getSubjectsList = async (req:Request, res: Response) => {
    try {
        const {department, search, page=1, limit=10} = req.query

        const currentPage = Math.max(1, Number(page) || 1)
        const limitPerPage = Math.max(1, Number(limit) || 10)
        const offset = (currentPage - 1) * limitPerPage

        const subjectsFilters = []

        if(search) {
            subjectsFilters.push(
                or(
                    ilike(subjects.code, `%${search}%` ),
                    ilike(subjects.name, `%${search}%`)
                )
            )
        }

        if(department){
            subjectsFilters.push(ilike(departments.name, `%${department}%`))
        }
        
        const whereclause = subjectsFilters.length > 0 ? and(...subjectsFilters) : undefined

        const countResult = await db.select(
                {count: sql<number>`count(*)`}
            )
            .from(subjects)
            .leftJoin(departments, eq(subjects.departmentId, departments.id))
            .where(whereclause)

        const totalCount = countResult[0]?.count ?? 0;

        const subjectList = await db.select({
                ...getTableColumns(subjects),
                department: {...getTableColumns(departments)}
            }
            )
            .from(subjects)
            .leftJoin(departments, eq(subjects.departmentId, departments.id))
            .where(whereclause)
            .orderBy(desc(subjects.createdAt))
            .limit(limitPerPage)
            .offset(offset)

        return res.status(200).json({
            data: subjectList,
            pagination: {
                page: currentPage,
                limit: limitPerPage,
                total: totalCount,
                totalPages: Math.ceil(totalCount / limitPerPage),
            }
        })

    } catch(e){
        console.error("Subjects error: ", e)
        return res.status(500).json({error: "Failed to get subjects list."})
    }
}