import Float "mo:base/Float";
import Array "mo:base/Array";

actor {
    // Calorías por gramo para cada alimento
    let Lacteos = [
        0.42,  // Leche
        2.64,  // Queso
        0.59,  // Yogur
        7.17   // Mantequilla
    ];

    let OrigenAnimal = [
        2.42,  // Cerdo
        1.65,  // Pollo
        2.13,  // Res
        1.28,  // Pescado
        1.55   // Huevo
    ];

    let Frutas = [
        0.52,  // Manzana
        0.89,  // Plátano
        0.47,  // Naranja
        0.42,  // Toronja
        0.68   // Guayaba
    ];

    let Verduras = [
        0.15,  // Lechuga
        0.18,  // Tomate
        0.27,  // Pimiento
        0.40   // Cebolla
    ];

    let Cereales = [
        1.30,  // Arroz
        1.58,  // Pasta
        2.65,  // Pan
        3.78   // Cereal
    ];

    let Legumbres = [
        3.41,  // Frijoles
        3.53,  // Lentejas
        3.64,  // Garbanzos
        0.81   // Chícharos
    ];
    
    let FloatUtils = { toText = func(x : Float) : Text = debug_show(x) };
    stable var historial : [Float] = [];

    // Función para agregar calorías al historial
    public func agregarCalorias(valor : Float) : async () {
        historial := Array.append(historial, [valor]);
    };

    public func calc(
        lacteosSel: Nat,
        lacteosQty: Float,
        animalSel: Nat,
        animalQty: Float,
        frutasSel: Nat,
        frutasQty: Float,
        verdurasSel: Nat,
        verdurasQty: Float,
        cerealesSel: Nat,
        cerealesQty: Float,
        legumbresSel: Nat,
        legumbresQty: Float
    ) : async Text {
        var totalCalorias = 0.0;
        
        totalCalorias += Lacteos[lacteosSel] * lacteosQty / 100.0;
        totalCalorias += OrigenAnimal[animalSel] * animalQty / 100.0;
        totalCalorias += Frutas[frutasSel] * frutasQty / 100.0;
        totalCalorias += Verduras[verdurasSel] * verdurasQty / 100.0;
        totalCalorias += Cereales[cerealesSel] * cerealesQty / 100.0;
        totalCalorias += Legumbres[legumbresSel] * legumbresQty / 100.0;
        
        let resultado : Text = "Total de calorías: " # FloatUtils.toText(totalCalorias) # " kcal,";
        
        // Agregar al historial
        await agregarCalorias(totalCalorias); // Llamar a la función para agregar calorías al historial
        return resultado;
    };

    public query func obtenerHistorial() : async [Float] {
        return historial;
    };

    // Función para cerrar la ventana y limpiar el historial
    public func cerrarVentana() : async Text {
        historial := []; // Limpiar el historial
        return "Historial cerrado."; // Mensaje de confirmación
    };
};
