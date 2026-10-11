import express from "express";
import upload from "../middleware/upload.js";
import {
  addTransaction,
  getAllTransactions,
  removeTransaction,
  getTotal,
  uploadStatement
} from "../controllers/transactionController.js";

const router = express.Router();

router.post("/transactions", addTransaction);// income,expense decides at the frontend
router.get("/transactions", getAllTransactions);
router.delete("/transactions/:id", removeTransaction);
router.get("/summary", getTotal);
router.post("/upload", upload.single('statement'), uploadStatement);

export default router;





