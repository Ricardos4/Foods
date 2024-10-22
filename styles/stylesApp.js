import { StyleSheet } from "react-native";

export const stylesApp = StyleSheet.create({
  padre: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  tarjeta: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    padding: 20,
    boxShadowColor: "#000",
    boxShadowOffset: {
      width: 0,
      height: 2,
    },
    boxShadowOpacity: 0.25,
    boxShadowRadius: 4,
  },
  cardDetail: {
    margin: 8,
    backgroundColor: "white",
    borderRadius: 20,
    width: "99%",
    padding: 10,
    boxShadowColor: "#000",
    boxShadowOpacity: 0.25,
    boxShadowRadius: 4,
  },

  padretabla: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 100,
  },
  tabla: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    width: "100%",
    padding: 10,
    boxShadowColor: "#000",
  },
  cajatexto: {
    paddingVertical: 20,
    borderRadius: 30,
    backgroundColor: "#cccccc40",
    marginVertical: 10,
  },
  padreboton: {
    alignItems: "center",
    padding: 10,
  },
  cajaboton: {
    backgroundColor: "#525FE1",
    borderRadius: 30,
    paddingVertical: 20,
    width: 150,
    marginTop: 20,
  },
  textoboton: {
    textAlign: "center",
    color: "white",
  },
  Subtitle: {
    fontSize: 20,
    color: "gray",
    textAlign: "center",
  },
  disable: {
    color: "gray",
    textAlign: "center",
    paddingHorizontal: 15,
  },
  title: {
    flex: 1, // Ocupa el espacio restante
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center", // Opcional: centra el título
  },
  titleDetail: {
    flex: 1, // Ocupa el espacio restante
    fontSize: 21,
    fontWeight: "bold",
    padding: 25,
    textAlign: "center", // Opcional: centra el título
  },
  buttons: {
    marginTop: 10,
    color: "gray",
    fontSize: 16,
    textAlign: "center",
    padding: 10,
  },
  editButton: {
    backgroundColor: "#4CAF50",
    padding: 20,
    borderRadius: 6,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  deletButton: {
    backgroundColor: "red",
    padding: 20,
    borderRadius: 6,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  cartButton: {
    backgroundColor: "#FD8E3E",
    borderRadius: 15,
    paddingVertical: 20,
    width: 150,
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5, // ajusta este valor para controlar la sombra en la dirección Y
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  containerButton: {
    alignItems: "center",
    marginBottom: 50,
    top: 20,
  },
  textButton: {
    textAlign: "center",
    color: "white",
    fontWeight: "600",
  },
  idioma: {
    position: "absolute",
    top: 45,
    right: 5,
    borderRadius: 60,
    flexDirection: "row",
    zIndex: 1000,
  },
  logout: {
    position: "absolute",
    top: 45,
    left: 5,
    borderRadius: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 1000,
    padding: 5,
  },
  bandera: {
    width: 42,
    height: 30,
    marginRight: 10,
  },
  volver: {
    width: 60,
    height: 30,
    marginLeft: 30,
  },
  cerrarSesion: {
    width: 100,
    height: 30,
    marginLeft: 10,
  },
  perfil: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: "white",
  },
  boton: {
    backgroundColor: "#525FE1",
    padding: 20,
    borderRadius: 6,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  error: {
    color: "red",
    marginVertical: 10,
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 15,
  },
  backButton: {
    position: "absolute",
    borderRadius: 6,
    backgroundColor: "#525FE1",
    left: 10,
    padding: 8,
    zIndex: 1,
  },
  backButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    paddingTop: 5,
  },
  backButtonContainer: {
    position: "absolute",
    top: 1,
    left: 10,
    zIndex: 1,
  },
  headerContainer: {
    flexDirection: "row", // Alinea en horizontal
    alignItems: "center", // Centra verticalmente
    justifyContent: "space-between",
    marginTop: 60,
    padding: 10,
  },
  safeAria: {
    flex: 1,
  },
  etiquetaPadre: {
    backgroundColor: "#FD8E3E",
    padding: 15,
    borderRadius: 20,
    width: 90,
    height: 50,
    marginHorizontal: 5,
  },
  etiquetaText: {
    top: 35,
    color: "black",
    textAlign: "center",

    fontSize: 18,
  },
  etiquetaContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  etiquetasList: {
    marginTop: 60,
  },
  tarjetaDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 2,
  },
  imagen: {
    flex: 1,
    width: 100,
    height: "100%",
    aspectRatio: 1,
    resizeMode: "cover",
    borderRadius: 10,
  },
  contenido: {
    flex: 1,
    padding: 10,
  },
  nombre: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    padding: 10,
  },
  descripcion: {
    fontSize: 15,
    marginBottom: 5,
    padding: 5,
  },
  precio: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FD8E3E",
    textAlign: "center",
    padding: 5,
  },
  containerList: {
    borderLeftColor: "#EEEEEE",
    flex: 1,
    margin: 10,
    padding: 15,
  },
  cardContainer: {
    position: "absolute", // Para que se superponga sobre la imagen
    top: 200, // Ajusta esta propiedad para controlar la distancia desde la parte superior de la imagen
    left: 20, // Ajusta esta propiedad para controlar la distancia desde el borde izaerdo
    right: 20, // Ajusta esta propiedad para controlar la distancia desde el borde derecho
    backgroundColor: "white",
    padding: 30,
    shadowOpacity: 0.5,
    borderRadius: 10,
    elevation: 2, // Nivel de elevación para la sombra
  },
  containerPrice: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  styleImage: {
    top: 20,
    height: 250,
    width: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
  textAmount: {
    backgroundColor: "#EEEEEE",
    padding: 10,
    borderRadius: 40,
    marginHorizontal: 20,
    fontSize: 10,
  },
  containerAmount: {
    justifyContent: "space-between",
    marginVertical: 10,
    top: 25,
    flexDirection: "row",
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 25,
    fontWeight: "bold",
    top: 10,
  },

  categoryContainer: {
    padding: 30,
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  categoryButton: {
    padding: 10,
    marginRight: 10,
    backgroundColor: "#eee",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryButtonSelected: {
    backgroundColor: "#FD8E3E", // Color de la categoría seleccionada
  },
  categoryText: {
    fontSize: 16,
    color: "#000",
  },
  abajoContainer: {
    flexDirection: "row",
    justifyContent: "space-around", // Espaciado igual entre botones
    alignItems: "center",
    borderTopColor: "#ddd",
  },
  abajoButton: {
    alignItems: "center",
  },
});
