const { Router } = require("express");
const { check } = require("express-validator");
const {
  actualizarProducto,
  crearProducto,
  eliminarProducto,
  obtenerProductos,
  obtenerProducto,
} = require("../controllers/productos");
const {
  existeCategoriaPorId,
  existeProductoPorId,
} = require("../helpers/db-validators");
const { validarCampos, validarJWT, esAdminRol } = require("../middlewares");

const router = Router();

router.get("/", obtenerProductos);

router.get(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  obtenerProducto
);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre del producto es requerido").not().isEmpty(),
    check("categoria", "La categoria es requerida").not().isEmpty(),
    check("categoria", "No es un ID de mongo").isMongoId(),
    check("categoria").custom(existeCategoriaPorId),
    validarCampos,
  ],
  crearProducto
);

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeProductoPorId),
    // check("nombre", "El nombre es requerido").not().isEmpty(),
    // check("precio", "El precio es requerido").not().isEmpty(),
    // check("descripcion", "La descripcion es requerida").not().isEmpty(),
    validarCampos,
  ],
  actualizarProducto
);

router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRol,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  eliminarProducto
);

module.exports = router;
