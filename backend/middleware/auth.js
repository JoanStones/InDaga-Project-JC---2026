import jwt from 'jsonwebtoken'

// Comprueba que la petición traiga un token válido y guarda los datos del usuario en req.usuario
export function requiereLogin(req, res, next) {
  const cabecera = req.headers.authorization || ''
  const token = cabecera.startsWith('Bearer ') ? cabecera.slice(7) : null
  if (!token) return res.status(401).json({ mensaje: 'Debes iniciar sesión.' })
  try {
    req.usuario = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ mensaje: 'Sesión inválida o vencida.' })
  }
}

// Además de estar logueado, exige que el usuario sea administrador
export function requiereAdmin(req, res, next) {
  requiereLogin(req, res, () => {
    if (req.usuario.rol !== 'admin') {
      return res.status(403).json({ mensaje: 'Solo el administrador puede hacer esto.' })
    }
    next()
  })
}