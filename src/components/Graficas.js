import React, { useEffect, useState } from "react";
import {
  Pie,
  Doughnut,
  Bar,
  Line,
  PolarArea,
  Radar,
  HorizontalBar,
} from "react-chartjs-2";
import "chart.piecelabel.js";

export const Graficas = () => {
  /*  */

  // const [respuesta, setRespuesta] = useState([]);
  // const [continente, setContinente] = useState([]);
  // const [porcentaje, setPorcentaje] = useState([]);
  // const [colores, setColores] = useState([]);
  const [data, setData] = useState({});
  const [opciones, setOpciones] = useState({});

  const getData = async () => {
    const key = process.env.SECRET_KEY;
    console.log(key);
    const res = await fetch(
      "https://api.jsonbin.io/b/605d15eb7c9f775f63898cc3/3",
      {
        headers: {
          "secret-key":
            "$2b$10$00i2WJVHEclFajlLWwRAtu5a6Rrp7MMZjTmnmmU8ePpOB5hyNctnS",
        },
      }
    );

    if (res.ok) {
      const body = await res.json();
      console.log(body);
      // setRespuesta(body);

      let continente = body.map((item) => item.continente);
      let porcentaje = body.map((item) => item.porcentaje);

      // setContinente(continente);
      // setPorcentaje(porcentaje);

      const coloresPro = [];
      const generarColores = (data) => {
        for (let i = 0; i < data.length; i++) {
          coloresPro.push(colorHex());
        }
        // setColores(coloresPro);
      };

      generarColores(body);

      console.log(coloresPro);

      configurarGrafica(continente, porcentaje, coloresPro);
    } else {
      console.log("Error al cargar los datos");
    }
  };

  const generarCaracter = () => {
    let caracter = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ];

    let numero = (Math.random() * 15).toFixed(0);
    return caracter[numero];
  };

  const colorHex = () => {
    let color = "";
    for (let i = 0; i < 6; i++) {
      color = color + generarCaracter();
    }
    return "#" + color;
  };

  const configurarGrafica = (continente, porcentaje, colores) => {
    const data = {
      labels: continente,
      datasets: [
        {
          label: "costo proyectos",
          data: porcentaje,
          backgroundColor: colores,
        },
      ],
    };

    const opciones = {
      responsive: true,
      pieceLabel: {
        render: function (args) {
          // console.log(args);
          return args.label + ":" + args.value + "%";
        },
        fontSize: 15,
        fontColor: "#fff",
        fontFamily: "Arial",
      },
    };
    // console.log(opciones);
    setData(data);
    setOpciones(opciones);
  };

  useEffect(() => {
    getData();
  }, []);

  /*  */
  return (
    <div className="container p-4">
      <div className="row m-2">
        <div className="col-md-6">
          <h5> Grafica del procentaje de los avances </h5>
          <hr />
          <Pie data={data} options={opciones}></Pie>
          {/* <Doughnut data={data} options={opciones}></Doughnut> */}
        </div>
        <div className="col-md-6">
          <h5> Grafica extra pro </h5>
          <hr />
          <Doughnut data={data} options={opciones}></Doughnut>
        </div>
      </div>

      <div className="row m-2">
        <div className="col-md-6">
          <h5> Grafica del proyecto más costoso </h5>
          <hr />
          <Bar data={data} options={opciones}></Bar>
          {/* <Doughnut data={data} options={opciones}></Doughnut> */}
        </div>
        <div className="col-md-6">
          <h5> Grafica extra pro </h5>
          <hr />
          <HorizontalBar data={data} options={opciones}></HorizontalBar>
        </div>
      </div>

      <div className="row m-2">
        <div className="col-md-6">
          <h5> Grafica del proyecto más costoso </h5>
          <hr />
          <Line data={data} options={opciones}></Line>
          {/* <Doughnut data={data} options={opciones}></Doughnut> */}
        </div>
        <div className="col-md-6">
          <h5> Grafica extra pro </h5>
          <hr />
          <Radar data={data} options={opciones}></Radar>
        </div>
      </div>
    </div>
  );
};
