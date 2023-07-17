import { Router } from "npm:express";

const router = Router();

router.get('/tasks', (req, res) => {
    return res.status(200).send('Getting tasks');
})

export default router;