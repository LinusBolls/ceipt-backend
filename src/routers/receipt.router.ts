import { Router } from "express";

import receiptController from "../controllers/receipt.controller";

const router = Router();

router.post("/", async (req, res) => {
    const data = await receiptController.create(req.body);

    if (data == null) {
        res.status(400).json({ ok: false, msg: "failed to create receipt" });

        return;
    }
    res.json({ ok: true, data });
});

router.get("/:id", async (req, res) => {
    const receiptId = req.params.id;

    const data = await receiptController.getById(receiptId);

    if (data == null) {
        res.status(404).json({ ok: false, msg: "could not find receipt" });

        return;
    }
    res.json({ ok: true, data });
});

router.get("/users/:id/receipts", async (req, res) => {

    const ownerId = req.params.id

    const data = await receiptController.getByOwnerUserId(ownerId)

    if (data == null) {
        res.status(404).json({ ok: false, msg: "could not find user" });

        return;
    }
    res.json({ ok: true, data });
})

export default router;