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
  number_order: number;
}

const ReactEmailSent = ({ number_order }: EmailProps) => {
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
                Dobrý deň.
              </Heading>

              <Text className="text-center font-bold text-[16px]">
                Vaša objednávka číslo {number_order} bola vybavená a odovzdaná
                kuriérovi DPD, ktorý Vás bude kontaktovať.
              </Text>

              <Section className="flex justify-start">
                <Text className="text-base" key={1}>
                  Ďakujeme za Váš nákup a sme radi, že využívate naše produkty.
                </Text>
                <Text className="text-base" key={2}>
                  Ak by ste mali akékoľvek otázky, neváhajte nás kontaktovať.
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
