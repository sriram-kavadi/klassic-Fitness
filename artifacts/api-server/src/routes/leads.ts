import { Router, type IRouter } from "express";
import { db, insertLeadSchema, leadsTable } from "@workspace/db";

const router: IRouter = Router();

router.post("/leads", async (req, res) => {
  const parsed = insertLeadSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input. Please check your name, phone, and goal." });
    return;
  }

  try {
    const [lead] = await db.insert(leadsTable).values(parsed.data).returning({ id: leadsTable.id });
    res.status(201).json({
      success: true,
      message: "Thanks! We'll contact you within 10 minutes.",
      id: lead.id,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to insert lead");
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

export default router;
