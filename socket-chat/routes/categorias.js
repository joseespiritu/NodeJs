const { Router } = require("express");
const { check } = require("express-validator");
const {
  actualizarCategoria,
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  categoriaDelete,
} = require("../controllers/categorias");

const { existeCategoriaPorId } = require("../helpers/db-validators");
const {
  validarJWT,
  validarCampos,
  esAdminRol,
} = require("../middlewares/index");

const router = Router();

/**
 * {{url}}/api/categorias
 */

// Obtener todas las categorias - publico
router.get("/", obtenerCategorias);

// Obtener una categoria por id - publico
// check('id').custom(existeCategoria)
router.get(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  obtenerCategoria
);

// Crear categoria - privado - cualquier persona con un token valido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

// Actualizar - privado - cualquiera con token valido
router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    check("nombre", "El nombre es requerido").not().isEmpty(),
    validarCampos,
  ],
  actualizarCategoria
);

// Borrar una categoria - Admin
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRol,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  categoriaDelete
);

module.exports = router;
