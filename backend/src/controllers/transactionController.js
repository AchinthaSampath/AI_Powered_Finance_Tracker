import { Transaction } from "../models/transactions.js";
import { categorizeTransactions } from "../services/geminiService.js";

// Every query now includes user: req.user.userId, so a transaction is only found if it belongs to the logged-in person
//add expenses
export const addTransaction = async (req, res) => {
  try {
    const { type, amount, category, description, date } = req.body;

    // Validation
    if (!type || !amount || amount < 1 || !category || !date) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const transactions = new Transaction({
      type,
      amount,
      category,
      description,
      date,
      user: req.user.userId,
    });
    await transactions.save();
    res.status(201).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET All Transactions
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.userId }).sort({ createdAt: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete A Transaction
export const removeTransaction = async (req, res) => {
  try {
    const transactions = await Transaction.findOneAndDelete({ _id: req.params.id, user: req.user.userId,});

    if (!transactions) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Summary

export const getTotal = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.userId });

    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpenses;

    res.status(200).json({ totalIncome, totalExpenses, balance });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const uploadStatement = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const csvString = req.file.buffer.toString("utf-8");
    const transactions = await categorizeTransactions(csvString); // Gemini: no user involved

    // stamp every transaction with the logged-in user's id
    const docs = transactions.map((t) => ({ ...t, user: req.user.userId }));
    await Transaction.insertMany(docs);

    res.json({ message: "Transaction imported", count: docs.length });
  } catch (error) {
    console.error("ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
};
