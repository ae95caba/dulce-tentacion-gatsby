import React from "react";
import { BannerSection } from "../components/BannerSection";
import { AboutUsBanner } from "../components/Images/Banners";
import CuteAnimeGirl from "../components/Images/CuteAnimeGirl";

export default function We() {
  return (
    <main id="we">
      <div className="content">
        <BannerSection
          h1={"Nosotros"}
          h2="El mejor helado artesanal"
          GatsbyImage={AboutUsBanner}
        />
        <h2>El helado Artesanal 👍 </h2>
        <p>
          Es sinónimo de <strong>calidad</strong>. Los helados artesanales se
          elaboran en un obrador, básicamente con procedimientos manuales. En su
          elaboración se emplea únicamente
          <strong> materia prima fresca y local</strong>, y al contrario de los
          helados industriales, no se utilizan saborizantes, colorantes, ni
          conservantes.
          <strong> Tienen mucho menos aire y mucha menos grasa</strong> (sólo
          7%) incorporada. Su precio es considerablemente mayor que el del
          helado industrial, debido a la calidad y cantidad de los productos
          empleados, además de su producción a pequeña escala. Es un helado
          cremoso y con mucho más cuerpo que un helado industrial.
          Nutricionalmente nos aporta calcio, aminoácidos y vitaminas.
        </p>
        <h2>El helado Industrial 👎</h2>
        <p>
          Son elaborados en plantas industriales en cuya producción se usan
          colorantes y saborizantes para realzar su aspecto y sabor. El heladero
          industrial busca fabricar un producto con el menor coste posible, el
          objetivo es maximizar la rentabilidad. Por eso se
          <strong> utilizan ingredientes de menor calidad</strong> y
          procedimientos como los siguientes: se sustituye la leche por sólido
          lácteo, la nata por grasa de coco, y sobre todo{" "}
          <strong>llevan una gran cantidad de aire incorporado</strong> (hasta
          100%). De esta forma sacan un mayor rendimiento al producto, pero
          rebajando la calidad comparado con el helado artesano. Gracias a su
          producción masiva, es uno de los más económicos. Lleva también mucha
          grasa (hasta 30%) de origen vegetal. Suelen ser menos cremosos que un
          helado artesanal. Por lo tanto,{" "}
          <strong>
            al tratarse de helados ultraprocesados, nutricionalmente son poco
            recomendables
          </strong>{" "}
          ya que hablamos de calorías vacías.
        </p>
        <div className="container">
          <p>Por eso nosotros apostamos por la calidad del helado artesanal.</p>
          <CuteAnimeGirl />
        </div>
      </div>
    </main>
  );
}
