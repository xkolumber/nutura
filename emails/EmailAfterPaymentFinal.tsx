import { FireBasePayment } from "@/app/lib/all_interfaces";
import { formatPrice } from "@/app/lib/functionsClient";
import {
  Body,
  Column,
  Container,
  Heading,
  Html,
  Img,
  Link,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface EmailProps {
  data: FireBasePayment;
}

const EmailAfterPayment = ({ data }: EmailProps) => {
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const year = currentDate.getFullYear();

  const formattedDate = `${day}.${month}.${year}`;

  const actual_year = new Date().getFullYear();

  return (
    <Html>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#2250f4",
                offwhite: "#fafbfb",
              },
              spacing: {
                0: "0px",
                20: "20px",
                45: "45px",
              },
            },
          },
        }}
      >
        <Body className="bg-offwhite text-base font-sans">
          <Container className="rounded-3xl ">
            <Section>
              <Img
                src="https://firebasestorage.googleapis.com/v0/b/nutura-4e004.appspot.com/o/email_fotky%2Flogo_nutura.png?alt=media&token=7085cbf3-f6e0-4618-8133-e11dcca739eb"
                width="120"
                height="36"
                alt="Slack"
                className="mt-4 mb-4 object-contain"
              />
            </Section>

            <Img
              src="https://firebasestorage.googleapis.com/v0/b/nutura-4e004.appspot.com/o/email_fotky%2Fnutura_titul.jpg?alt=media&token=0c3caaf6-631b-425d-a749-d757f29a40a3"
              alt="Popis"
              className="object-cover rounded-t-3xl w-full h-[250px]"
            />
            <Container className="bg-white rounded-b-3xl p-[25px]">
              <Heading className="text-center my-0 leading-10">
                Ďakujeme za Vašu objednávku. Začíname sa jej ihneď venovať.
              </Heading>

              <Section className="flex justify-start">
                <Text className="text-base" key={1}>
                  Ak ste si zvolili platbu cez dobierku, Vaša objednávka bude
                  odoslaná v nasledujúci pracovný deň.
                </Text>
                <Text className="text-base" key={2}>
                  Ak ste si zvolili platbu prevodom na účet, na konci tohto
                  textu nájdete údaje k platbe.
                </Text>
                <Text className="text-base" key={3}>
                  Pri platbe kartou alebo prevodom, Vám tovar zasielame
                  nasledujúci deň po pripísaní platby na náš účet.
                </Text>
                <Text className="text-base" key={3}>
                  Doklad o platbe obdržíte spolu s tovarom.
                </Text>

                <Text className="text-base" key={4}>
                  O ďalšom postupe pri vybavovaní Vašej objednávky, Vás budeme
                  informovať
                </Text>

                <Text className="text-base" key={5}>
                  <b>Dodávateľ:</b>
                  <p>NUTURA - sprejové vitamíny, Enmery s.r.o.</p>
                  <p>Hviezdoslavova 1781/22, 953 01 </p>
                  <p>Zlaté Moravce</p>
                  <p>Slovenská republika</p>
                  <p>IČO: 52492443</p>
                  <p>DIČ: 2121043177</p>
                  <p>IČ DPH: SK2121043177</p>
                </Text>

                <Text className="text-base mt-8" key={6}>
                  <b> Dátum objednávky: </b>
                  {formattedDate}
                </Text>

                {data.type_payment === "prevod_na_ucet" && (
                  <Text className="text-base" key={6}>
                    <b> Typ objednávky: </b>
                    prevod na účet
                  </Text>
                )}
                {data.type_payment === "dobierka" && (
                  <Text className="text-base" key={6}>
                    <b> Typ objednávky: </b>
                    dobierka
                  </Text>
                )}
                {data.type_payment === "platba_kartou" && (
                  <Text className="text-base" key={6}>
                    <b> Typ objednávky: </b>
                    platba kartou
                  </Text>
                )}

                <Text className="text-base" key={6}>
                  <b> Osobné údaje: </b>
                </Text>
                <Text className="text-base" key={7}>
                  {data.name}
                </Text>
                <Text className="text-base" key={7}>
                  {data.telephone_number}
                </Text>

                <Text className="text-base" key={6}>
                  <b> Doručovacia adresa: </b>
                </Text>
                <Text className="text-base" key={7}>
                  {data.city}
                </Text>
                <Text className="text-base" key={8}>
                  {data.street}
                </Text>
                <Text className="text-base" key={9}>
                  {data.psc}
                </Text>
                <Text className="text-base" key={10}>
                  {data.country}
                </Text>

                {data.invoice_ico && (
                  <>
                    <Text className="text-base" key={16}>
                      <b> Fakturačné údaje: </b>
                    </Text>
                    <Text className="text-base" key={17}>
                      {data.invoice_name}
                    </Text>
                    <Text className="text-base" key={18}>
                      {data.invoice_city}
                    </Text>
                    <Text className="text-base" key={19}>
                      {data.invoice_street}
                    </Text>
                    <Text className="text-base" key={20}>
                      {data.invoice_psc}
                    </Text>
                    <Text className="text-base" key={20}>
                      {data.invoice_country}
                    </Text>
                    <Text className="text-base" key={20}>
                      {data.invoice_company}
                    </Text>
                    <Text className="text-base" key={20}>
                      IČO: {data.invoice_ico}
                    </Text>
                    <Text className="text-base" key={20}>
                      DIČ: {data.invoice_dic}
                    </Text>
                    <Text className="text-base" key={20}>
                      IC DPH:{data.invoice_icdph}
                    </Text>
                  </>
                )}

                <Text className="text-base" key={11}>
                  <b> Objednané produkty: </b>
                  {data.products.map((orderItem, index) => (
                    <p key={index}>
                      {orderItem.product_name} - {orderItem.quantity}ks -{" "}
                      {formatPrice(orderItem.price)} €
                    </p>
                  ))}
                </Text>

                <Text className="text-base" key={12}>
                  <b> Doprava: </b>
                  {data.type_transport} - {data.price_transport.toFixed(2)}
                </Text>

                <Text className="text-base" key={12}>
                  <b> Cena spolu: </b>
                  {data.price.toFixed(2)} € s DPH
                </Text>

                <Text className="text-base" key={13}>
                  <b>
                    Údaje pre platbu prevodom na bankový účet SK 18 8330 0000
                    0027 0311 5938
                  </b>
                  <b> Variabilný symbol: {data.number_order}</b>
                </Text>

                <Text className="text-base mt-8" key={14}>
                  S pozdravom
                </Text>
                <Text className="text-base" key={15}>
                  Tím Nutura
                </Text>
              </Section>
            </Container>
          </Container>

          <Container className="text-center">
            <Row style={categories.container}>
              <Column align="center">
                <Link href="https://www.facebook.com/profile.php?id=61553215864005">
                  <Img
                    src="https://firebasestorage.googleapis.com/v0/b/website-4d9ed.appspot.com/o/logo%2Ffacebook_logo.png?alt=media&token=02dc67cf-c527-4355-8c72-7013319b6e65"
                    className="w-6 h-6 object-contain rounded-lg"
                  />
                </Link>
              </Column>
              <Column align="center">
                <Link href="https://www.instagram.com/nuturasprejovevitaminy/">
                  <Img
                    src="https://firebasestorage.googleapis.com/v0/b/website-4d9ed.appspot.com/o/logo%2Finstagram_logo.png?alt=media&token=51954141-8c2b-4f24-b286-ce45a898093a"
                    className="w-6 h-6 object-contain"
                  />
                </Link>
              </Column>
              <Column align="center">
                <a href="tel:+421444455322">
                  <Img
                    src="https://firebasestorage.googleapis.com/v0/b/website-4d9ed.appspot.com/o/logo%2Ftelephone.png?alt=media&token=bf11ac8d-99ee-4536-a62b-a98d3c1dace8"
                    className="w-6 h-6 object-contain"
                  />
                </a>
              </Column>
            </Row>
            <Text className="text-center text-gray-400 mb-45">
              © {actual_year} | Nutura ®, SLOVENSKO |{" "}
              <Link
                href="https://www.martinzastko.sk"
                className=" text-gray-400"
              >
                www.nuturasprejovevitaminy.sk
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

const paragraph = {
  fontSize: 16,
};

const container = {
  padding: 0,
};

const containerStyle = {
  backgroundColor: "white",
  borderRadius: "20px",
  padding: "20px", // Default padding for all screen sizes
};

const categories = {
  container: {
    width: "370px",
    margin: "auto",
    paddingTop: "12px",
  },
  text: {
    fontWeight: "500",
    color: "#000",
  },
};

export default EmailAfterPayment;
