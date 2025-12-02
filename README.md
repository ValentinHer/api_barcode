# API de productos (Express + MongoDB)

API para registrar y consultar productos según los campos de la pizarra (nombre, marca, proveedor, precios, fechas, código de barras y stock).

## Requisitos
- Node.js 18+
- MongoDB local corriendo en `mongodb://localhost:27017`

## Configuración
1. Instala dependencias:
   ```bash
   npm install
   ```
2. Crea un archivo `.env` (opcional) para sobreescribir la URL de Mongo o el puerto:
   ```bash
   MONGO_URI=mongodb://localhost:27017/crud-products
   PORT=3000
   ```

## Ejecución
```bash
npm start
```

## Endpoints principales
- `POST /api/products` crear producto.
- `GET /api/products` listar todos.
- `GET /api/products/barcode/:code` buscar por código de barras.
- `GET /api/products/:id` obtener uno.
- `PUT /api/products/:id` actualizar.
- `DELETE /api/products/:id` eliminar.

Los cuerpos JSON aceptan:
```json
{
  "name": "Nombre del producto",
  "brand": "Marca",
  "supplier": "Proveedor",
  "purchasePrice": 10.5,
  "salePrice": 15.0,
  "purchaseDate": "2024-01-01",
  "expirationDate": "2024-12-31",
  "barcode": "ABC123456",
  "stock": 50
}
```
