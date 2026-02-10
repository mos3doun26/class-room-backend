import { Router } from "express";
import { getSubjectsList } from "../controllers/departments";

const router = Router()

router.get('/', getSubjectsList)



export default router
