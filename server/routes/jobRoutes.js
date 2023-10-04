import { createJob,getAllJobs,updateJob,deleteJob,showStats} from "../controller/jobController.js"
import express from "express";
const router = express.Router();

router.route("/").post(createJob).get(getAllJobs);
//////////remeber aboiut id
router.route("/stats").get(showStats);
router.route("/:id").delete(deleteJob).patch(updateJob);

export default router;