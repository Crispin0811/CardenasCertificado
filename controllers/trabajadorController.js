const getTrabajadores =(req, res)=>{

    res.render('listaTrabajadores',{
        tituloPagina: "Lista de Trabajadores",
    })
}

const agregarTrabajador =(req, res)=>{

    res.render('agregarTrabajador',{
        tituloPagina: "Agregar Trabajadores",
    })
}

module.exports = {
    getTrabajadores,
    agregarTrabajador
}