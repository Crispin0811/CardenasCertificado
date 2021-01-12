const getCertificado = (req,res)=>{
    res.render('generarCerticado',{
        tituloPagina: "Generar Certificado",
    })
}
module.exports = {
    getCertificado
}