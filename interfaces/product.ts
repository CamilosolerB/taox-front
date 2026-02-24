export interface Product {
  id_product: string;
  name: string;
  generic_name: string;
  price: number;
  unit_measure: string;
  unit_price: number;
  min_unit_price: number;
  lead_time_days: number;
  restorage: string;
  company_id: string;
}

export const products: Product[] = [
  {
    codigo_producto: "A00000001",
    nombre: "HIDROXIDO DE SODIO EN ESCAMAS_SACO X 25KG - 99% ",
    nombre_generico: "SODA EN ESCAMAS",
    total_inventario: 450,
    ubicacion: "PLANTA PTARND"
  },
  {
    codigo_producto: "A00000002",
    nombre: "HIDROXIDO DE SODIO LIQUIDA_TAMBOR X 250KG - 50% ",
    nombre_generico: "SODA LIQUIDA",
    total_inventario: 0,
    ubicacion: ""
  },
  {
    codigo_producto: "A00000003",
    nombre: "HIPOCLORITO DE SODIO LIQUIDO_TAMBOR X 250KG - 15%",
    nombre_generico: "HIPOCLORITO DE SODIO",
    total_inventario: 410,
    ubicacion: "PLANTA PTARND"
  },
  {
    codigo_producto: "A00000004",
    nombre: "HIPOCLORITO DE SODIO LIQUIDO_GARRAFA X 24KG - 15%",
    nombre_generico: "HIPOCLORITO DE SODIO",
    total_inventario: 0,
    ubicacion: ""
  },
  {
    codigo_producto: "A00000005",
    nombre: "AGUA DESMINERALIZADA_GARRAFA X 20L",
    nombre_generico: "AGUA DESMINERALIZADA",
    total_inventario: 0,
    ubicacion: ""
  },
  {
    codigo_producto: "A00000006",
    nombre: "SILICONA ANTIESPUMANTE LIQUIDO_GARRAFA X 20L",
    nombre_generico: "ANTIESPUMANTE",
    total_inventario: 28,
    ubicacion: "BODEGA PTARND"
  },
  {
    codigo_producto: "A00000007",
    nombre: "CLORURO FERRICO LIQUIDO_GARRAFA X 30KG  - 42%",
    nombre_generico: "CLORURO FERRICO",
    total_inventario: 510,
    ubicacion: "PLANTA PTARND"
  },
  {
    codigo_producto: "A00000008",
    nombre: "CLORURO FERRICO LIQUIDO_TAMBOR X 250KG  - 42%",
    nombre_generico: "CLORURO FERRICO",
    total_inventario: 0,
    ubicacion: ""
  },
  {
    codigo_producto: "A00000009",
    nombre: "POLIMERO ANIONICO SOLIDO_ASPRE FLOC AN 315_BOLSA X 1KG - 99%",
    nombre_generico: "PAM ANIONICO",
    total_inventario: 10,
    ubicacion: "BODEGA PTARND"
  },
  {
    codigo_producto: "A00000010",
    nombre: "PEROXIDO DE HIDROGENO LIQUIDO_GARRAFA X 30KG - 50%",
    nombre_generico: "PEROXIDO",
    total_inventario: 30,
    ubicacion: "BODEGA PTARND"
  },
  {
    codigo_producto: "A00000011",
    nombre: "ACIDO CITRICO SOLIDO_BOLSA X 1KG - 99%",
    nombre_generico: "ACIDO CITRICO",
    total_inventario: 14,
    ubicacion: "BODEGA PTARND"
  },
  {
    codigo_producto: "A00000012",
    nombre: "BISULFITO DE SODIO_SACO X 25KG - 99%",
    nombre_generico: "BISULFITO",
    total_inventario: 0,
    ubicacion: ""
  },
  {
    codigo_producto: "A00000013",
    nombre: "CUBETA TEST DQO X 25 - RANGO BAJO (0 -150 mg/l) - HI93754A-25",
    nombre_generico: "VIALES DQO BAJO",
    total_inventario: 45,
    ubicacion: "LABORATORIO PTARND"
  },
  {
    codigo_producto: "A00000014",
    nombre: "CUBETA TEST DQO X 25 - RANGO MEDIO (0 -1500 mg/l) - HI93754B-25",
    nombre_generico: "VIALES DQO MEDIO",
    total_inventario: 0,
    ubicacion: "LABORATORIO PTARND"
  },
  {
    codigo_producto: "A00000015",
    nombre: "CUBETA TEST DQO X 25 - RANGO ALTO (0 -15000 mg/l) - HI93754C-25",
    nombre_generico: "VIALES DQO ALTO",
    total_inventario: 19,
    ubicacion: "LABORATORIO PTARND"
  },
  {
    codigo_producto: "A00000016",
    nombre: "TEST KIT CLORUROS - HI3815",
    nombre_generico: "TEST CLORUROS",
    total_inventario: 1,
    ubicacion: "LABORATORIO PTARND"
  },
  {
    codigo_producto: "A00000017",
    nombre: "REACTIVO COBRE RANGO ALTO - HI93702-01",
    nombre_generico: "REACTIVO COBRE",
    total_inventario: 81,
    ubicacion: "LABORATORIO PTARND"
  },
  {
    codigo_producto: "A00000018",
    nombre: "REACTIVO HIERRO RANGO ALTO - HI93721-01",
    nombre_generico: "REACTIVO HIERRO",
    total_inventario: 71,
    ubicacion: "LABORATORIO PTARND"
  },
  {
    codigo_producto: "A00000019",
    nombre: "REACTIVO CLORO TOTAL - HI93711-01",
    nombre_generico: "REACTIVO CLORO TOTAL",
    total_inventario: 71,
    ubicacion: "LABORATORIO PTARND"
  },
  {
    codigo_producto: "A00000020",
    nombre: "REACTIVO CROMO 6 RANGO ALTO - HI93723-01",
    nombre_generico: "REACTIVO CROMO",
    total_inventario: 21,
    ubicacion: "LABORATORIO PTARND"
  },
  {
    codigo_producto: "A00000021",
    nombre: "REACTIVO SULFATO - HI93751-01",
    nombre_generico: "REACTIVO SULFATO",
    total_inventario: 80,
    ubicacion: "LABORATORIO PTARND"
  },
  {
    codigo_producto: "A00000022",
    nombre: "REACTIVO CLORO LIBRE - HI93701-01",
    nombre_generico: "REACTIVO CLORO LIBRE",
    total_inventario: 68,
    ubicacion: "LABORATORIO PTARND"
  },
  {
    codigo_producto: "A00000023",
    nombre: "REACTIVO NIQUEL RANGO ALTO - HI93726-01",
    nombre_generico: "REACTIVO NIQUEL",
    total_inventario: 82,
    ubicacion: "LABORATORIO PTARND"
  },
  {
    codigo_producto: "A00000024",
    nombre: "TEST KIT FENOL - HI3864",
    nombre_generico: "TEST FENOL",
    total_inventario: 22,
    ubicacion: "LABORATORIO PTARND"
  },
  {
    codigo_producto: "A00000025",
    nombre: "REACTIVO ZINC - HI93731",
    nombre_generico: "REACTIVO ZINC",
    total_inventario: 81,
    ubicacion: "LABORATORIO PTARND"
  },
  {
    codigo_producto: "A00000026",
    nombre: "REACTIVO FLUORUROS - HI93729-01",
    nombre_generico: "REACTIVO FLUORUROS",
    total_inventario: 340,
    ubicacion: "LABORATORIO PTARND"
  },
  {
    codigo_producto: "A00000027",
    nombre: "REACTIVO PLATA - HI93737-01",
    nombre_generico: "REACTIVO PLATA",
    total_inventario: 1,
    ubicacion: "LABORATORIO PTARND"
  },
  {
    codigo_producto: "A00000028",
    nombre: "SOLUCION BUFFER PH 7.01 - HI7007L/C",
    nombre_generico: "BUFFER 7",
    total_inventario: 400,
    ubicacion: "LABORATORIO PTARND"
  },
  {
    codigo_producto: "A00000029",
    nombre: "SOLUCION BUFFER PH 4.01 - HI7004L/C",
    nombre_generico: "BUFFER 4",
    total_inventario: 430,
    ubicacion: "LABORATORIO PTARND"
  },
  {
    codigo_producto: "A00000030",
    nombre: "SOLUCION BUFFER PH 10.01 - HI7010L/C",
    nombre_generico: "BUFFER 10",
    total_inventario: 400,
    ubicacion: "LABORATORIO PTARND"
  },
  {
    codigo_producto: "A00000031",
    nombre: "ESTANDAR DE CONDUCTIVIDAD 1413 MS/CM - HI7031L/C",
    nombre_generico: "BUFFER CONDUCTIVIDAD",
    total_inventario: 200,
    ubicacion: "LABORATORIO PTARND"
  },
  {
    codigo_producto: "A00000032",
    nombre: "SOLUCION LIMPIEZA DE ELECTRODOS - HI70670L",
    nombre_generico: "SOLUCION DE LIMPIEZA ELECTRODOS",
    total_inventario: 480,
    ubicacion: "LABORATORIO PTARND"
  },
  {
    codigo_producto: "A00000033",
    nombre: "LECHO FILTRANTE GRAVA 1/2",
    nombre_generico: "GRAVA GRUESA",
    total_inventario: 0,
    ubicacion: ""
  },
  {
    codigo_producto: "A00000034",
    nombre: "LECHO FILTRANTE GRAVA 1/4",
    nombre_generico: "GRAVA MEDIA",
    total_inventario: 0,
    ubicacion: ""
  },
  {
    codigo_producto: "A00000035",
    nombre: "LECHO FILTRANTE GRAVA 1/8",
    nombre_generico: "GRAVA FINA",
    total_inventario: 0,
    ubicacion: ""
  },
  {
    codigo_producto: "A00000036",
    nombre: "LECHO FILTRANTE ARENA 20-30",
    nombre_generico: "ARENA ",
    total_inventario: 0,
    ubicacion: ""
  },
  {
    codigo_producto: "A00000037",
    nombre: "LECHO FILTRANTE ANTRACITA",
    nombre_generico: "ANTRACITA",
    total_inventario: 0,
    ubicacion: ""
  },
  {
    codigo_producto: "A00000038",
    nombre: "LECHO FILTRANTE CARBON ACTIVADO",
    nombre_generico: "CARBON ACTIVADO",
    total_inventario: 0,
    ubicacion: ""
  },
  {
    codigo_producto: "A00000039",
    nombre: "LAMINAS DE HIERRO_140 CM*30CM*0,3CM_SISTEMA EFLOC",
    nombre_generico: "LAMINAS DE HIERRO",
    total_inventario: 0,
    ubicacion: ""
  },
  {
    codigo_producto: "A00000040",
    nombre: "LAMINAS DE ACERO INOX_140 CM*30CM*0,3CM_SISTEMA EFLOC",
    nombre_generico: "LAMINAS DE ACERO INOX",
    total_inventario: 0,
    ubicacion: ""
  },
  {
    codigo_producto: "A00000041",
    nombre: "MANGAS DE MICROFILTRACION FSI_100 MICRAS",
    nombre_generico: "MANGAS DE UF",
    total_inventario: 10,
    ubicacion: "ALMACEN PTARND"
  },
  {
    codigo_producto: "A00000042",
    nombre: "DISCOS DE FILTRACION_200 MICRAS",
    nombre_generico: "DISCOS DE FILTRACION",
    total_inventario: 0,
    ubicacion: "PLANTA PTARND"
  },
  {
    codigo_producto: "A00000043",
    nombre: "FILTRO MICROFILTRACION SWC-45-2025_50 MICRAS_",
    nombre_generico: "FILTRO DE PTAP",
    total_inventario: 0,
    ubicacion: ""
  },
];