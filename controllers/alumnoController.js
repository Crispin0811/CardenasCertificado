const getAlumno = (req,res)=>{
    res.render('agregarAlumno',{
        tituloPagina: "Agregar Alumno",
    })
}
module.exports = {
    getAlumno
}