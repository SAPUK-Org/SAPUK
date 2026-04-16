import { Router, RequestHandler } from "express";
const staffRouter = Router();
import {
  activateStaffMember,
  createStaffMember,
  deactivateStaffMember,
  deleteStaffMember,
  getStaffMember,
  getStaffMembers,
  patchStaffMemberRole,
  updateStaffMember,
} from "../../controllers/dashboard-controller";

staffRouter.get("/", getStaffMembers as RequestHandler);
staffRouter.post("/", createStaffMember as RequestHandler);
staffRouter.get("/:id", getStaffMember as RequestHandler);
staffRouter.put("/:id", updateStaffMember as RequestHandler);
staffRouter.delete("/:id", deleteStaffMember as RequestHandler);
staffRouter.patch("/:id/role", patchStaffMemberRole as RequestHandler);
staffRouter.patch("/:id/deactivate", deactivateStaffMember as RequestHandler);
staffRouter.patch("/:id/activate", activateStaffMember as RequestHandler);

export default staffRouter;
