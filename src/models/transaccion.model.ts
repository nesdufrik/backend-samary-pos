import { model, Schema, Types } from "mongoose";
import { Atencion, Estado } from "../interfaces/enums";
import { Categoria, SubCategoria, Item, Orden, ProductosOrden } from "../interfaces/transaccion.interface";

const CategoriaSchema = new Schema<Categoria>(
    {
        name: { type: String, required: true },
        sucursal: { type: Types.ObjectId, ref: 'sucursales', required: true }
    }
)

const SubCategoriaSchema = new Schema<SubCategoria>(
    {
        name: { type: String, required: true },
        sucursal: { type: Types.ObjectId, ref: 'sucursales', required: true },
        categoria: { type: Types.ObjectId, ref: 'categorias', required: true }
    }
)

const ItemSchema = new Schema<Item>(
    {
        name: { type: String, required: true },
        sucursal: { type: Types.ObjectId, ref: 'sucursales', required: true },
        descripcion: { type: String, required: true },
        subCategoria: { type: Types.ObjectId, ref: 'subcategorias', required: true },
        precio: { type: Number, required: true },
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const OrdenSchema = new Schema<Orden>(
    {
        cliente: { type: Types.ObjectId, ref: 'clientes', required: true },
        empleado: { type: Types.ObjectId, ref: 'empleados', required: true },
        estado: {
            type: String,
            required: true,
            default: Estado.Pending,
            enum: Object.values(Estado)
        },
        tipo: {
            type: String,
            required: true,
            enum: Object.values(Atencion)
        },
        pedido: [{ type: Types.ObjectId, ref: 'pedidos', required: true }],
        total: Number,
        factura: { type: Boolean, required: true, default: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const PedidoSchema = new Schema<ProductosOrden>(
    {
        name: { type: String, required: true },
        cantidad: { type: Number, required: true },
        pendiente: { type: Number, required: true },
        nota: String,
        precio: { type: Number, required: true },
        importe: { type: Number, required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
)


const CategoriaModel = model('categorias', CategoriaSchema)
const SubCategoriaModel = model('subcategorias', SubCategoriaSchema)
const ItemModel = model('items', ItemSchema)
const OrdenModel = model('ordenes', OrdenSchema)
const PedidoModel = model('pedidos', PedidoSchema)

export { CategoriaModel, SubCategoriaModel, ItemModel, OrdenModel, PedidoModel }