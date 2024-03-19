import {
  Body,
  Column,
  Container,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface EmailProps {
  data: any;
  number_order: number;
}

const ReactEmailSent = ({ data, number_order }: EmailProps) => {
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
                src="https://firebasestorage.googleapis.com/v0/b/website-4d9ed.appspot.com/o/logo%2FM%20%26%20Z.png?alt=media&token=bea60a9c-a1c4-47f3-89ec-a9afe153565e"
                width="120"
                height="36"
                alt="Slack"
                className="mt-4 mb-4"
              />
            </Section>

            <Img
              src="https://firebasestorage.googleapis.com/v0/b/website-4d9ed.appspot.com/o/svg_fotky_produkty%2Fmonthly_plus_product.png?alt=media&token=e834cfed-1f28-451a-854a-6f6e2c23642e"
              alt="Popis"
              className="object-contain rounded-t-3xl max-w-[100%]"
            />
            <Container className="bg-white rounded-b-3xl p-[25px]">
              <Heading className="text-center my-0 leading-10">
                Ďakujem za Vašu objednávku. Začíname sa jej ihneď venovať.
              </Heading>

              <Section className="flex justify-start">
                <Text className="text-base" key={1}>
                  Ak ste si zvolili platbu cez dobierku, alebo platbu kartou,
                  Vaša objednávka bude odoslaná v nasledujúci pracovný deň.
                </Text>
                <Text className="text-base" key={2}>
                  Ak ste si zvolili platbu prevodom, na konci tohto textu
                  nájdete údaje k platbe.
                </Text>
                <Text className="text-base" key={3}>
                  Pri platbe kartou alebo prevodom, Vám tovar zasielame
                  nasledujúci deň po pripísaní platby na náš účet.
                </Text>

                <Text className="text-base" key={4}>
                  O ďalšom postupe pri vybavovaní Vašej objednávky, Vás budeme
                  informovať
                </Text>

                <Text className="text-base" key={5}>
                  <b>Dodávateľ:</b>
                  <p>NUTURA - sprejové vitamíny, s.r.o.</p>
                  <p>-------- 87</p>
                  <p>831 02 Bratislava</p>
                  <p>Slovenská republika</p>
                  <p>DIČ: -------</p>

                  <p>
                    Firma je registrovaná OR O----------------a číslo 140173/Bv
                  </p>
                </Text>

                <Text className="text-base" key={6}>
                  <b> Dátum objednávky: </b>
                  06.12.2024
                </Text>
                <Text className="text-base" key={6}>
                  <b> Typ objednávky: </b>
                  platba kartou
                </Text>

                <Text className="text-base" key={6}>
                  <b> Osobné údaje: </b>
                </Text>
                <Text className="text-base" key={7}>
                  Ľuboš Kolumber
                </Text>
                <Text className="text-base" key={7}>
                  0918654146
                </Text>

                <Text className="text-base" key={6}>
                  <b> Doručovacia adresa: </b>
                </Text>
                <Text className="text-base" key={7}>
                  Mesto
                </Text>
                <Text className="text-base" key={7}>
                  Ulica
                </Text>
                <Text className="text-base" key={7}>
                  PSČ
                </Text>
                <Text className="text-base" key={7}>
                  Krajina
                </Text>

                <Text className="text-base" key={6}>
                  <b> Objednané produkty: </b>
                </Text>

                <Text className="text-base" key={6}>
                  <b>
                    Údaje pre platbu prevodom na bankový účet
                    SK-------------------------53{" "}
                  </b>
                  <b> Variabilný symbol:${number_order}</b>
                </Text>

                <Text className="text-base mt-8" key={6}>
                  S pozdravom
                </Text>
                <Text className="text-base" key={6}>
                  Tím Nutura
                </Text>

                {/*Fakturacne udaje*/}
                {/* <Text style={paragraph} key={10}>
                  <b>Cena: </b>
                  {price} €{" "}
                  {parseInt(number_month) > 0 && (
                    <span style={{ marginLeft: "5px" }}>mesačne</span>
                  )}
                </Text> */}
                {/* {parseInt(number_month) > 0 && (
                  <Text style={paragraph} key={10}>
                    <b>Dĺžka našej spolupráce v mesiacoch: </b>
                    {number_month}
                  </Text>
                )} */}
              </Section>
            </Container>
          </Container>

          <Container className="text-center">
            <Row style={categories.container}>
              <Column align="center">
                <Link href="https://www.facebook.com/martin.zastko">
                  <Img
                    src="https://firebasestorage.googleapis.com/v0/b/website-4d9ed.appspot.com/o/logo%2Ffacebook_logo.png?alt=media&token=02dc67cf-c527-4355-8c72-7013319b6e65"
                    className="w-6 h-6 object-contain rounded-lg"
                  />
                </Link>
              </Column>
              <Column align="center">
                <Link href="https://www.instagram.com/m_zastko/">
                  <Img
                    src="https://firebasestorage.googleapis.com/v0/b/website-4d9ed.appspot.com/o/logo%2Finstagram_logo.png?alt=media&token=51954141-8c2b-4f24-b286-ce45a898093a"
                    className="w-6 h-6 object-contain"
                  />
                </Link>
              </Column>
              <Column align="center">
                <a href="tel:+421911519713">
                  <Img
                    src="https://firebasestorage.googleapis.com/v0/b/website-4d9ed.appspot.com/o/logo%2Ftelephone.png?alt=media&token=bf11ac8d-99ee-4536-a62b-a98d3c1dace8"
                    className="w-6 h-6 object-contain"
                  />
                </a>
              </Column>
            </Row>
            <Text className="text-center text-gray-400 mb-45">
              © 2024 | Nutura s.r.o, SLOVENSKO |{" "}
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

export default ReactEmailSent;
