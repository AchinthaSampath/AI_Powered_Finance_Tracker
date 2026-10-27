import multer from "multer";

const storage = multer.memoryStorage(); // stores file in memory as buffer, good for CSV/PDF parsing without saving to disk
const upload = multer({ storage });

export default upload;
