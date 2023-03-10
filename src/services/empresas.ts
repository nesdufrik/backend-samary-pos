import { JwtPayload } from "jsonwebtoken";
import { Empresa, Sucursal } from "../interfaces/empresa.interface";
import { EmpresaModel, SucursalModel } from "../models/empresa.model";

export const getAllEmpresas = async (session: JwtPayload) => {
    const listAll = await EmpresaModel.find({ propietario: session.id })
    return listAll
}

export const getAllSucursales = async (id: string) => {
    const listAll = await SucursalModel.find({ empresa: id })
    return listAll
}

export const detailEmpresa = async (id: string) => {
    const detail = await EmpresaModel.findOne({ _id: id })
    return detail
}

export const detailSucursal = async (id: string) => {
    const detail = await SucursalModel.findOne({ _id: id })
    return detail
}

export const createEmpresa = async (data: Empresa, session: JwtPayload) => {
    const crear = await EmpresaModel.create({
        name: data.name,
        propietario: session.id
    })

    return crear
}

export const createSucursal = async (data: Sucursal, id: string) => {
    const crear = await SucursalModel.create({
        name: data.name,
        empresa: id,
        direccion: data.direccion,
        telefono: data.telefono
    })

    return crear
}

export const updateEmpresa = async (data: Empresa, id: string) => {
    const actualizar = await EmpresaModel.findOneAndUpdate({ _id: id }, { name: data.name }, { new: true })

    return actualizar
}

export const updateSucursal = async (data: Sucursal, id: string) => {
    const actualizar = await SucursalModel.findOneAndUpdate({ _id: id }, {
        name: data.name,
        direccion: data.direccion,
        telefono: data.telefono
    }, { new: true })

    return actualizar
}

export const deleteEmpresa = async (id: string) => {
    const eliminar = await EmpresaModel.deleteOne({ _id: id })
    return eliminar
}

export const deleteSucursal = async (id: string) => {
    const eliminar = await SucursalModel.deleteOne({ _id: id })
    return eliminar
}