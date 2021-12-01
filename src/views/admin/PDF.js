import { PDFDownloadLink, Link, Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import Logo from 'assets/img/logo 4k shadow.png';

let interesMeses = ""
let interesPais = ""
let distM = ""
let nombre = ""
let noticias = ""
let productos = ""
let today = ""
let nombreProd = ""
let precioSugeridoA =""
let enBaseA=""
let dataInteresRegion = ""
let regionMas = ""
let showRegion = false
let fechaMas=""
let enviado = false
let interesTiempoR = ""
let histograma = ""
let estimacion = ""
let dataHistogramaR = ""
let imagenVentasDoceMesesR = ""
let imagenVentasSeisMesesR = ""
let imagenVentasSARIMAXR = ""
let boolDoceMeses = false
let boolSeisMeses = false
let boolSARIMAX = false

function SendEmail(correo,blob){
  console.log(blob)
  var convertido = ""
  if (blob != null) {
    if (!enviado) {
      enviado = true
      var reader = new FileReader();
      reader.readAsDataURL(blob); 
      reader.onloadend = function() {
        var base64data = reader.result;                
        console.log(base64data);
        convertido = base64data
        fetch("http://localhost:8000/sendMail",{
          method: "POST",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            titulo: correo,
            archivo: convertido})
        })
      }
    }
  } 
}

Font.register({family:'M PLUS 2', 
  fonts:[
    {src: 'https://fonts.gstatic.com/s/mplus2/v1/7Auhp_Eq3gO_OGbGGhjdwrDdpeIBxlkwOa6Vxg.ttf'},
    {src: 'https://fonts.gstatic.com/s/mplus2/v1/7Auhp_Eq3gO_OGbGGhjdwrDdpeIBxlkwkKmVxg.ttf',
    fontWeight: 'heavy'},
    {src: 'https://fonts.gstatic.com/s/mplus2/v1/7Auhp_Eq3gO_OGbGGhjdwrDdpeIBxlkw3qmVxg.ttf',
    fontWeight: 'bold'}
  ]});

const styles = StyleSheet.create({
    page: {
      fontFamily: 'M PLUS 2',
      flexDirection: 'row',
      backgroundColor: 'white'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    },
    titulo1: {
      fontFamily: 'M PLUS 2',
      fontWeight: 'heavy',
      fontSize: '30px',
      marginLeft:'10px',
      marginRight: '10px',
      marginBottom: '8px',
      textAlign: 'center'
    },
    titulo2: {
      fontWeight: 'bold',
      fontSize: '19px',
      marginTop: '4px',
      marginLeft:'10px',
      marginRight: '10px',
      marginBottom: '8px'
    },
    normal: {
      borderTopWidth: 4,
      borderTopColor: '#0084B4',
      //color: '#898989',
      padding: 10,
      flexGrow: 1,
      fontSize: '13px'
    },
    image: {
      alignSelf: 'center',
      marginTop: '4px',
      transform: 'scale(0.85)'
    },
    imageH: {
      alignSelf: 'center',
      marginTop: '4px',
      transform: 'scale(0.75)',
      marginRight:'125px'
    },
    imageVentas: {
      alignSelf: 'center',
      marginTop: '4px',
      transform: 'scale(0.75)',
    },
    imagenLogo: {
      height: 15,
      width: 83,
      alignSelf: 'center',
      marginTop: '4px',
      marginBottom: '8px'
    },
    parrafo:{
      fontFamily: 'M PLUS 2',
      marginLeft:'20px',
      marginRight: '10px',
      fontSize: '12px'
    },
    datosGrafico:{
      fontSize: '10px',
      textAlign: 'center',
      marginLeft:'125px',
      marginRight: '125px',
      marginBottom: '8px'
    },
    datosGraficoVentas:{
      fontSize: '10px',
      textAlign: 'center',
      marginLeft:'125px',
      marginRight: '125px',
    }
  });

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('/');
}

const MyDoc = () => (
    <Document>
      <Page size="A4" style={styles.page} subject="Estudio de mercado">
        <View style={styles.normal}>
          <Image src={Logo} style={styles.imagenLogo}/>
          <Text style={styles.titulo1}>Reporte de estudio de mercado</Text>
          <Text style={styles.parrafo}>Producto: {nombreProd}</Text>
          <Text style={styles.parrafo}>Reporte generado el {today}</Text>
          <Text style={styles.parrafo}>Precio sugerido para el producto: {parseInt(precioSugeridoA).toLocaleString('es-CL',{style: 'currency', currency: 'CLP'})} (en base a {enBaseA} productos)</Text>
            {interesTiempoR.length !== 0 && (
              <Text style={styles.titulo2}>Interés por el producto en los últimos 12 meses</Text>
            )}
            {interesTiempoR.length !== 0 && (
              <Image src={interesMeses} style={styles.image} />
            )}
            {interesTiempoR.length !== 0 && (
              <Text style={styles.datosGrafico}> El interés representa la cantidad de búsquedas sobre el producto. El 100 marca el punto de mayor interés con el resto de los puntos escalados a ese máximo. </Text>
            )}
            {interesTiempoR.length !== 0 && ( 
              <Text style={styles.parrafo}>Aquí se puede ver que la fecha de mayor interés fue el {formatDate(fechaMas)}</Text>
            )}
        </View>
      </Page>
      
      {showRegion && (
      <Page size="A4" style={styles.page} subject="Estudio de mercado">
        <View style={styles.normal}>
          <Image src={Logo} style={styles.imagenLogo}/>
          <Text style={styles.titulo2}>Interés por el producto por región</Text>
          <Image src={interesPais} style={styles.image}/>
          <Text style={styles.datosGrafico}> Las regiones más oscuras representan un mayor interés por el producto. </Text>
          {regionMas !== "" && (
            <Text style={styles.parrafo}>Aquí se puede ver que la región en la que tu producto es más popular es la de {regionMas}</Text>
          )}
        </View>
      </Page>
      )}

      <Page size="A4" style={styles.page} subject="Estudio de mercado">
        <View style={styles.normal}>
          <Image src={Logo} style={styles.imagenLogo}/>
          <Text style={styles.titulo2}>Distribución por marcas</Text>
          <Image src={distM} style={styles.image}/>
          <Text style={styles.datosGrafico}> Gráfico de la distribución de marcas de productos similares. </Text>
        </View>
      </Page>

      {dataHistogramaR!=="nada" && (
      <Page size="A4" style={styles.page} subject="Estudio de mercado">
        <View style={styles.normal}>
          <Image src={Logo} style={styles.imagenLogo}/>
          <Text style={styles.titulo2}>Histograma de precios</Text>
          <Image src={histograma} style={styles.imageH}/>
          <Text style={styles.datosGrafico}> Histograma de la distribución de precios del producto en el mercado. </Text>
        </View>
      </Page>
      )}

      <Page size="A4" style={styles.page} subject="Estudio de mercado">
        <View style={styles.normal}>
          <Image src={Logo} style={styles.imagenLogo}/>
          <Text style={styles.titulo2}>Estimación de fluctuación de precio en 4 meses</Text>
          <Image src={estimacion} style={styles.image}/>
          <Text style={styles.datosGrafico}> Estimación del precio en los próximos 4 meses </Text>
        </View>
      </Page>

      {noticias !== "NO" && (
      <Page size="A4" style={styles.page} subject="Estudio de mercado">
        <View style={styles.normal}>
          <Image src={Logo} style={styles.imagenLogo}/>
          <Text style={styles.titulo2}>Noticias Relacionadas</Text>
          <Text style={styles.parrafo}>
            {noticias[0].source['text']}: <Link src={noticias[0].link}>{noticias[0].title}</Link>
          </Text>
          {noticias !== "NO" && noticias[1] !== null && (
            <Text style={styles.parrafo}>
              {noticias[1].source['text']}: <Link src={noticias[1].link}>{noticias[1].title}</Link>
            </Text>
          )}
          {noticias !== "NO" && noticias[2] !== null && (
            <Text style={styles.parrafo}>
              {noticias[2].source['text']}: <Link src={noticias[2].link}>{noticias[2].title}</Link>
            </Text>
          )}
        </View>
      </Page>
      )}

      {(boolDoceMeses || boolSeisMeses || boolSARIMAX) && (
      <Page size="A4" style={styles.page} subject="Estudio de mercado">
        <View style={styles.normal}>
          <Image src={Logo} style={styles.imagenLogo}/>
          <Text style={styles.titulo2}>Estimaciones de ventas</Text>
          {boolDoceMeses && (
            <Image src={imagenVentasDoceMesesR} style={styles.imageVentas}/>
          )}
          {boolDoceMeses && (
            <Text style={styles.datosGraficoVentas}> Estimación de ventas por promedio mensual para 12 meses </Text>
          )}
          {boolSeisMeses && (
            <Image src={imagenVentasSeisMesesR} style={styles.imageVentas}/>
          )}
          {boolSeisMeses && (
            <Text style={styles.datosGraficoVentas}> Estimación de ventas con regresión lineal para 6 meses </Text>
          )}
          {boolSARIMAX && (
            <Image src={imagenVentasSARIMAXR} style={styles.imageVentas}/>
          )}
          {boolSARIMAX && (
            <Text style={styles.datosGraficoVentas}> Estimación de ventas con SARIMAX para 6 meses </Text>
          )}
        </View>
      </Page>
      )}

      {productos["count"] !== undefined && (
      <Page size="A4" style={styles.page} subject="Estudio de mercado">
        <View style={styles.normal}>
          <Image src={Logo} style={styles.imagenLogo}/>
          <Text style={styles.titulo2}>Productos Relacionadas</Text>
          <Text style={styles.parrafo}>Cantidad de productos relacionados: {(productos["count"])}</Text>
          <Text style={styles.parrafo}>Entre los que se incluyen: </Text>
          <Text style={styles.parrafo}>
            {productos["link1"].split(";")[0]}: <Link src={(productos["link1"].split(";")[2])}>{productos["link1"].split(";")[1]}</Link>
          </Text>
          {productos["count"] > 1 && (
            <Text style={styles.parrafo}>
              {productos["link2"].split(";")[0]}: <Link src={(productos["link2"].split(";")[2])}>{productos["link2"].split(";")[1]}</Link>
            </Text>
          )}
          {productos["count"] > 2 && (
            <Text style={styles.parrafo}>
              {productos["link3"].split(";")[0]}: <Link src={(productos["link3"].split(";")[2])}>{productos["link3"].split(";")[1]}</Link>
            </Text>
          )}
        </View>
      </Page>
      )}
    </Document>
  );

export default function creaPDF(grafMeses,grafPais,distMarcas,nombreR,noticiasR,productosRelacionados,precioSugerido,correo,interesRegion,interesTiempo,imagenHistograma,imagenEstimacion,dataHistograma,imagenVentasDoceMeses,imagenVentasSeisMeses,imagenVentasSARIMAX,dataDoceMeses,dataSeisMeses,dataSARIMAX) {
    interesMeses = grafMeses
    interesPais = grafPais
    distM = distMarcas
    noticias = JSON.parse(noticiasR)
    productos = productosRelacionados
    nombreProd = nombreR
    today = new Date().toLocaleDateString()
    nombre = "EstudioMercado_" + nombreR + today + ".pdf"
    precioSugeridoA = precioSugerido.split(";")[0]
    enBaseA = precioSugerido.split(";")[1]
    interesTiempo.forEach((x,i) => {
      if(x[1]===100){
        fechaMas = new Date(x[0])
      }
    })
    dataInteresRegion = JSON.parse(interesRegion)
    dataInteresRegion.forEach((x,i) => {
      if(x.value[0] === 100){
        regionMas = x.geoName.replace("Region","")
      }
      if(x.value[0] !== 0){
        showRegion = true
      }
    })
    interesTiempoR = interesTiempo
    histograma = imagenHistograma
    estimacion = imagenEstimacion
    console.log(dataHistograma)
    dataHistogramaR = dataHistograma
    imagenVentasDoceMesesR = imagenVentasDoceMeses
    imagenVentasSeisMesesR = imagenVentasSeisMeses
    imagenVentasSARIMAXR = imagenVentasSARIMAX
    if(dataDoceMeses!=="nada"){
      boolDoceMeses = true
    }
    if(dataSeisMeses!=="nada"){
      boolSeisMeses = true
    }
    if(dataSARIMAX!=="nada"){
      boolSARIMAX = true
    }
    return (
      <div className="App">
        <PDFDownloadLink document={<MyDoc />} fileName={nombre}>
          {({ blob, url, loading, error }) => {
          loading ? console.log("cargando") : SendEmail(correo,blob)
          //loading ? 'Cargando' : 'Descargar PDF' 
        }}
        </PDFDownloadLink>
      </div>
    );
  }
