import { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar2 from "../components/Navbar/Navbar2";
import StepBack from "../components/StepBack";

export const metadata: Metadata = {
  title: "Obchodné podmienky",
  description: "Obchodné podmienky spoločnosti Nutura",

  keywords: ["Nutura", "Výživové doplnky v spreji"],
  openGraph: {
    title: "Obchodné podmienky",
    description: "Obchodné podmienky spoločnosti Nutura",
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/symbiom-new.appspot.com/o/fotky_metadata%2Fhome_intro3.jpg?alt=media&token=cafacb60-8c3f-41e8-a7c2-f8861324631a",
        alt: "Nutura",
      },
    ],
  },
};

const page = () => {
  return (
    <>
      <Navbar2 />
      <div className="own_edge">
        <div className="main_section additional_padding">
          <StepBack />
          <h1>Obchodné podmienky</h1>
          <h3 className="mt-8 md:mt-16 mb-2">Základné informácie</h3>
          <p>
            Tieto obchodné podmienky sa vzťahujú na zmluvy uzatvorené na diaľku
            v e-shope www.nuturasprejovevitaminy.sk [1] medzi predávajúcim a
            kupujúcim podľa Zákona na ochranu spotrebiteľa č. 102/2014 Zb.
            Predávajúcim je: Soulmate s.r.o. so sídlom Pod kalváriou 678/38 941
            23 Andovce, IČO: 52492443, DIČ: 2121043177 IČ DPH: SK2121043177,
            podľa §4, registrácia od 10.5.2020
          </p>

          <p className="">
            Kupujúcim je spotrebiteľ, t.j. fyzická osoba, ktorá pri uzatváraní a
            plnení spotrebiteľskej zmluvy nekoná v rámci predmetu svojej
            podnikateľskej činnosti zamestnania alebo povolania. Nákup
            uskutočnený podnikateľským subjektom sa riadi podľa Obchodného
            zákonníka č. 513/1991 Zb.
          </p>
          <h3 className="mt-8 md:mt-16 mb-2">Objednávka a uzavretie zmluvy</h3>
          <p>
            Odoslanie vyplnenej objednávky kupujúcim sa považuje za návrh na
            uzavretie zmluvy podľa Občianskeho zákonníka, na základe ponuky
            predávajúceho v e-shope. K uzavretiu zmluvy dochádza potvrdením
            objednávky zo strany predávajúceho.
          </p>
          <h3 className="mt-8 md:mt-16 mb-2">Ceny tovaru</h3>
          <p>
            Všetky ceny produktov v e-shope sú konečné, vrátane všetkých daní.
            Predávajúci je platiteľom DPH. Cena produktu nezahŕňa náklady na
            doručenie. Tie sú uvedené na stránke{" "}
            <Link href={"https://www.nuturasprejovevitaminy.sk"}>
              www.nuturasprejovevitaminy.sk
            </Link>{" "}
            [2] v nákupnom košíku ešte pred dokončením objednávky, kde kupujúci
            vidí aj celkovú cenu objednávky vrátane nákladov na dodanie tovaru.
          </p>

          <h3 className="mt-8 md:mt-16 mb-2">Platba za tovar</h3>
          <p>
            Predávajúci akceptuje platbu za objednaný tovar spôsobmi, ktoré sú
            uvedené na stránke www.nutura.sk. Súčasťou objednávky v e-shope je
            povinnosť kupujúceho zaplatiť cenu predávajúcemu za objednaný tovar.
          </p>
          <h3 className="mt-8 md:mt-16 mb-2">Online platby</h3>
          <p>
            Online platby pre nás zabezpečuje platobná brána Comgate.
            Poskytovateľ Comgate a.s. je licencovaná platobná inštitúcia
            pôsobiaca pod dohľadom Českej národnej banky. Platby realizované
            prostredníctvom platobnej brány sú plne zabezpečené a všetky
            informácie sú šifrované. Viac informácií a kontakty nájdete na{" "}
            <Link href={"https://www.comgate.cz"} className="underline">
              www.comgate.cz.
            </Link>{" "}
            [3]
          </p>
          <h3 className="mt-8 md:mt-16 mb-2">
            Kontaktné údaje na spoločnosť Comgate, a.s
          </h3>
          <p>Comgate, a.s.</p>
          <p>Gočárova třída 1754 / 48b,Hradec Králové</p>
          <p> E-mail: platby-podpora@comgate.cz Tel: +420 228 224 267</p>
          <p>Tel: +420 228 224 267</p>

          <h3 className="mt-8 md:mt-16 mb-2">Dodanie tovaru</h3>
          <p>
            Ak nie je dodacia lehota uvedená pri produkte, platí, že predávajúci
            dodá kupujúcemu tovar najneskôr do 30 dní. Zvyčajná dodacia doba pre
            produkty, ktoré sú skladom, je pracovné 2 dni. Tovar sa považuje za
            prevzatý kupujúcim okamihom, keď kupujúci alebo ním určená tretia
            osoba (s výnimkou dopravcu) prevezme všetky časti objednaného
            tovaru, alebo ak sa a) tovary objednané kupujúcim v jednej
            objednávke dodávajú oddelene, okamihom prevzatia tovaru, ktorý bol
            dodaný ako posledný, b) dodáva tovar pozostávajúci z viacerých
            dielov alebo kusov, okamihom prevzatia posledného dielu alebo
            posledného kusu, c) tovar dodáva opakovane počas vymedzeného
            obdobia, okamihom prevzatia prvého dodaného tovaru.
          </p>
          <h3 className="mt-8 md:mt-16 mb-2">Reklamačný poriadok</h3>
          <p>
            Predávajúci zodpovedá za vady, ktoré má tovar pri prevzatí
            kupujúcim. Pri použitých veciach nezodpovedá za vady vzniknuté ich
            použitím alebo opotrebením. Pri veciach predávaných za nižšiu cenu
            nezodpovedá za vadu, pre ktorú bola dojednaná nižšia cena. Ak nejde
            o veci, ktoré sa rýchlo kazia, alebo o použité veci, zodpovedá
            predávajúci za vady, ktoré sa vyskytnú po prevzatí veci v záručnej
            dobe (záruka). Záručná doba na nový tovar je 24 mesiacov, ktorá
            plynie od prevzatia tovaru kupujúcim. Záručná doba na použitý tovar
            je 12 mesiacov. Záručnú doba na služby (oprava alebo úprava veci) je
            3 mesiace. Záručná doba na zhotovenie veci na zákazku je 24
            mesiacov. Ak je na predávanej veci, jej obale alebo návode k nej
            pripojenom vyznačená lehota na použitie, záručná doba neskončí pred
            uplynutím tejto lehoty. Reklamáciu na veci, ktoré sa rýchlo kazia,
            musí kupujúci uplatniť najneskôr v deň nasledujúci po kúpe. Záručná
            doba pre kupujúceho, ktorý nie je spotrebiteľom, je 24 mesiacov. Ak
            má kúpenú vec uviesť do prevádzky iný podnikateľ než predávajúci,
            začne záručná doba plynúť až odo dňa uvedenia veci do prevádzky,
            pokiaľ kupujúci objednal uvedenie do prevádzky najneskôr do troch
            týždňov od prevzatia veci a riadne a včas poskytol na vykonanie
            služby potrebnú súčinnosť. Záručný list sa vystavuje na žiadosť
            kupujúceho. Na uplatnenie reklamácie postačuje doklad o kúpe. Ak má
            tovar vadu, ktorú možno odstrániť, má kupujúci právo, aby bola
            bezplatne, včas a riadne odstránená. Predávajúci je povinný vadu bez
            zbytočného odkladu odstrániť. Kupujúci môže namiesto odstránenia
            vady požadovať výmenu veci, alebo ak sa vada týka len súčasti veci,
            výmenu súčasti, ak tým predávajúcemu nevzniknú neprimerané náklady
            vzhľadom na cenu tovaru alebo závažnosť vady. Predávajúci môže vždy
            namiesto odstránenia vady vymeniť vadnú vec za bezávadnú, ak to
            kupujúcemu nespôsobí závažné ťažkosti. Ak ide o vadu, ktorú nemožno
            odstrániť a ktorá bráni tomu, aby sa vec mohla riadne užívať ako vec
            bez vady, má kupujúci právo na výmenu veci alebo má právo od zmluvy
            odstúpiť. Tie isté práva prislúchajú kupujúcemu, ak ide síce o
            odstrániteľné vady, ak však kupujúci nemôže pre opätovné vyskytnutie
            sa vady po oprave alebo pre väčší počet vád vec riadne užívať. Ak
            ide o iné neodstrániteľné vady, má kupujúci právo na primeranú zľavu
            z ceny veci. Práva zo zodpovednosti za vady sa uplatňujú u
            predávajúceho, na adrese sídla. Ak je však v záručnom liste uvedený
            záručný servis, ktorý je v mieste predávajúceho alebo v mieste pre
            kupujúceho bližšom, uplatní kupujúci právo na opravu v záručnom
            servise. Záručný servis je povinný opravu vykonať v lehote najneskôr
            do 30 dní. Ak dôjde k výmene, začne plynúť záručná doba znova od
            prevzatia novej veci. To isté platí, ak dôjde k výmene súčiastky, na
            ktorú bola poskytnutá záruka. Vybavením reklamácie sa rozumie
            ukončenie reklamačného konania odovzdaním opraveného výrobku,
            výmenou výrobku, vrátením kúpnej ceny výrobku, vyplatením primeranej
            zľavy z ceny výrobku, písomná výzva na prevzatie plnenia alebo jej
            odôvodnené zamietnutie. Pri uplatnení reklamácie predávajúci určí
            spôsob vybavenia reklamácie ihneď alebo v zložitých prípadoch
            najneskôr do 3 pracovných dní odo dňa uplatnenia reklamácie, v
            odôvodnených prípadoch, najmä ak sa vyžaduje zložité technické
            zhodnotenie stavu výrobku alebo služby, najneskôr do 30 dní odo dňa
            uplatnenia reklamácie. Po určení spôsobu vybavenia reklamácie sa
            reklamácia vybaví ihneď, v odôvodnených prípadoch možno reklamáciu
            vybaviť aj neskôr; vybavenie reklamácie však nesmie trvať dlhšie ako
            30 dní odo dňa uplatnenia reklamácie. Po uplynutí lehoty na
            vybavenie reklamácie má kupujúci právo od zmluvy odstúpiť alebo má
            právo na výmenu výrobku za nový výrobok. Ak kupujúci uplatnil
            reklamáciu výrobku počas prvých 12 mesiacov od kúpy, môže
            predávajúci vybaviť reklamáciu zamietnutím len na základe odborného
            posúdenia; bez ohľadu na výsledok odborného posúdenia nebude od
            kupujúceho vyžadovať úhradu nákladov na odborné posúdenie ani iné
            náklady súvisiace s odborným posúdením. Predávajúci je povinný
            poskytnúť kupujúcemu kópiu odborného posúdenia odôvodňujúceho
            zamietnutie reklamácie najneskôr do 14 dní odo dňa vybavenia
            reklamácie. Ak kupujúci reklamáciu výrobku uplatnil po 12 mesiacoch
            od kúpy a predávajúci ju zamietol, predávajúci v doklade o vybavení
            reklamácie uvedie, komu môže kupujúci zaslať výrobok na odborné
            posúdenie. Ak je výrobok zaslaný na odborné posúdenie určenej osobe,
            náklady odborného posúdenia, ako aj všetky ostatné s tým súvisiace
            účelne vynaložené náklady znáša predávajúci bez ohľadu na výsledok
            odborného posúdenia. Ak kupujúci odborným posúdením preukáže
            zodpovednosť predávajúceho za vadu, môže reklamáciu uplatniť znova;
            počas vykonávania odborného posúdenia záručná doba neplynie.
            Predávajúci je povinný kupujúcemu uhradiť do 14 dní odo dňa znova
            uplatnenia reklamácie všetky náklady vynaložené na odborné
            posúdenie, ako aj všetky s tým súvisiace účelne vynaložené náklady.
            Znova uplatnenú reklamáciu nemožno zamietnuť. Predávajúci je povinný
            pri uplatnení reklamácie vydať kupujúcemu potvrdenie. Ak je
            reklamácia uplatnená e-mailom, predávajúci je povinný potvrdenie o
            uplatnení reklamácie doručiť kupujúcemu ihneď; ak nie je možné
            potvrdenie doručiť ihneď, musí sa doručiť bez zbytočného odkladu,
            najneskôr však spolu s dokladom o vybavení reklamácie; potvrdenie o
            uplatnení reklamácie sa nemusí doručovať, ak kupujúci má možnosť
            preukázať uplatnenie reklamácie iným spôsobom.
          </p>
          <h3 className="mt-8 md:mt-16 mb-2">
            Vrátenie tovaru – odstúpenie od zmluvy bez udania dôvodu
          </h3>
          <p>
            Kupujúci je oprávnený odstúpiť od zmluvy bez udania dôvodu do 14 dní
            odo dňa prevzatia tovaru. Toto právo môže využiť len spotrebiteľ.
            Tovar sa považuje za prevzatý kupujúcim okamihom, keď kupujúci alebo
            ním určená tretia osoba s výnimkou dopravcu prevezme všetky časti
            objednaného tovaru, alebo ak sa a) tovary objednané kupujúcim v
            jednej objednávke dodávajú oddelene, okamihom prevzatia tovaru,
            ktorý bol dodaný ako posledný, b) dodáva tovar pozostávajúci z
            viacerých dielov alebo kusov, okamihom prevzatia posledného dielu
            alebo posledného kusu, c) tovar dodáva opakovane počas vymedzeného
            obdobia, okamihom prevzatia prvého dodaného tovaru. Kupujúci môže
            odstúpiť od zmluvy, predmetom ktorej je dodanie tovaru, aj pred
            začatím plynutia lehoty na odstúpenie od zmluvy.
          </p>
          <h3 className="mt-8 md:mt-16 mb-2">
            Kupujúci nemôže odstúpiť od zmluvy, predmetom ktorej je:
          </h3>
          <ul className="list-disc">
            <li>
              predaj tovaru zhotoveného podľa osobitných požiadaviek
              spotrebiteľa, tovaru vyrobeného na mieru alebo tovaru určeného
              osobitne pre jedného spotrebiteľa,
            </li>
            <li>
              predaj tovaru, ktorý podlieha rýchlemu zníženiu akosti alebo
              skaze,
            </li>
            <li>
              predaj tovaru uzavretého v ochrannom obale, ktorý nie je vhodné
              vrátiť z dôvodu ochrany zdravia alebo z hygienických dôvodov a
              ktorého ochranný obal bol po dodaní porušený,
            </li>
            <li>
              predaj tovaru, ktorý môže byť vzhľadom na svoju povahu po dodaní
              neoddeliteľne zmiešaný s iným tovarom,
            </li>
            <li>
              predaj zvukových záznamov, obrazových záznamov, zvukovoobrazových
              záznamov, kníh alebo počítačového softvéru predávaných v ochrannom
              obale, ak spotrebiteľ tento obal rozbalil,
            </li>
            <li>
              predaj periodickej tlače s výnimkou predaja na základe dohody o
              predplatnom a predaj kníh nedodávaných v ochrannom obale,
            </li>
            <li>
              poskytnutie služieb súvisiacich s činnosťami v rámci voľného času
              a podľa ktorej sa predávajúci zaväzuje poskytnúť tieto služby v
              dohodnutom čase alebo v dohodnutej lehote{" "}
            </li>
          </ul>
          <p className="mt-8">
            Kupujúci môže uplatniť právo na odstúpenie zmluvy v písomnej podobe
            alebo na inom trvalom nosiči (napr. e-mailom), prípadne odoslaním
            vyplneného formulára, ktorý je dostupný na [uveďte link na
            predvyplnený formulár]. Právo na odstúpenie od zmluvy je možné
            uplatniť odoslaním oznámenia o odstúpení od zmluvy aj v posledný deň
            14-dňovej lehoty. Po doručení oznámenia o odstúpení od zmluvy
            predávajúci vráti najneskôr do 14 dní kupujúcemu všetky platby,
            ktoré od neho prijal na základe zmluvy alebo v súvislosti s ňou,
            vrátane nákladov na dopravu, dodanie a poštovné a iných nákladov a
            poplatkov. Predávajúci vráti platbu rovnakým spôsobom, ako kupujúci
            použil pri svojej platbe. Kupujúci sa môže s predávajúcim dohodnúť
            aj na inom spôsobe vrátenia platby. Predávajúci nie je povinný
            uhradiť kupujúcemu dodatočné náklady, ak si kupujúci výslovne zvolil
            iný spôsob doručenia, ako je najlacnejší bežný spôsob doručenia
            ponúkaný predávajúcim. Dodatočnými nákladmi sa rozumie rozdiel medzi
            nákladmi na doručenie, ktoré si zvolil kupujúci, a nákladmi na
            najlacnejší bežný spôsob doručenia ponúkaný predávajúcim. Pri
            odstúpení od zmluvy predávajúci nie je povinný vrátiť kupujúcemu
            platby pred tým, ako mu je tovar doručený alebo kým kupujúci
            nepreukáže zaslanie tovaru späť predávajúcemu, ibaže predávajúci
            navrhne, že si tovar vyzdvihne osobne alebo prostredníctvom ním
            poverenej osoby. Kupujúci je povinný najneskôr do 14 dní odo dňa
            odstúpenia od zmluvy zaslať tovar späť alebo ho odovzdať
            predávajúcemu alebo osobe poverenej predávajúcim na prevzatie
            tovaru. Táto lehota sa považuje za zachovanú, ak bol tovar odovzdaný
            na prepravu najneskôr v posledný deň lehoty. Pri odstúpení od zmluvy
            znáša kupujúci iba náklady na vrátenie tovaru predávajúcemu alebo
            osobe poverenej predávajúcim na prevzatie tovaru a aj náklady na
            vrátenie tovaru, ktorý vzhľadom na jeho povahu nie je možné vrátiť
            prostredníctvom pošty. Kupujúci zodpovedá za zníženie hodnoty
            tovaru, ktoré vzniklo v dôsledku takého zaobchádzania s tovarom,
            ktoré je nad rámec zaobchádzania potrebného na zistenie vlastností a
            funkčnosti tovaru. Kupujúci má po doručení tovaru možnosť odskúšať
            jeho funkčnosť, nemôže však tovar používať, ak odstupuje od zmluvy.
            Na účely zistenia povahy, charakteristík a funkčnosti tovaru by mal
            spotrebiteľ s tovarom manipulovať a skontrolovať ho len takým
            spôsobom, akým by mu to bolo umožnené v „kamennom“ obchode. Od
            kupujúceho sa vyžaduje, aby počas lehoty na odstúpenie od zmluvy s
            tovarom manipuloval a kontroloval ho s náležitou starostlivosťou.
          </p>
          <h3 className="mt-8 md:mt-16 mb-2">Alternatívne riešenie sporov</h3>
          <p>
            Nakupujúci – spotrebiteľ – má právo obrátiť sa na predávajúceho so
            žiadosťou o nápravu (e-mailom na info@smsystem.sk), ak nie je
            spokojný so spôsobom, ktorým predávajúci vybavil jeho reklamáciu
            alebo ak sa domnieva, že predávajúci porušil jeho spotrebiteľské
            práva. Ak predávajúci odpovie na túto žiadosť zamietavo alebo na ňu
            neodpovie do 30 dní od jej odoslania, spotrebiteľ má právo podať
            návrh na začatie alternatívneho riešenia sporu subjektu
            alternatívneho riešenia sporov (ďalej len subjekt ARS) podľa zákona
            391/2015 Z.z. ARS subjektami sú orgány a oprávnené právnické osoby
            podľa §3 zákona 391/2015 Z.z. Zoznam subjektov ARS je možné nájsť na
            stránke Ministerstva hospodárstva SR www.mhsr.sk [4]. Návrh môže
            spotrebiteľ podať spôsobom určeným podľa §12 Zákona 391/2015 Z.z.
            Spotrebiteľ môže podať sťažnosť aj prostredníctvom platformy
            alternatívneho riešenia sporov RSO, ktorá je dostupná online na
            http://ec.europa.eu/consumers/odr/index_en.htm. Alternatívne
            riešenie sporov môže využiť len spotrebiteľ – fyzická osoba, ktorá
            pri uzatváraní a plnení spotrebiteľskej zmluvy nekoná v rámci
            predmetu svojej podnikateľskej činnosti, zamestnania alebo
            povolania. Alternatívne riešenie sporov sa týka len sporu medzi
            spotrebiteľom a predávajúcim, vyplývajúceho zo spotrebiteľskej
            zmluvy alebo súvisiaceho so spotrebiteľskou zmluvou. Alternatívne
            riešenie sporov sa týka len zmlúv uzatvorených na diaľku.
            Alternatívne riešenie sporov sa netýka sporov, kde hodnota sporu
            neprevyšuje sumu 20 EUR. Subjekt ARS môže od spotrebiteľa požadovať
            úhradu poplatku za začatie alternatívneho riešenia sporu maximálne
            do výšky 5 EUR s DPH.
          </p>
          <h3 className="mt-8 md:mt-16 mb-2">Ochrana osobných údajov</h3>
          <p>
            Účelom spracovania osobných údajov je ich využitie na plnenie
            spotrebiteľskej zmluvy, ktorú predávajúci uzatvára s kupujúcim
            vytvorením objednávky v tomto internetovom obchode. Táto
            spotrebiteľská zmluva je zároveň právnym základom pre spracúvanie
            osobných údajov kupujúceho. Poskytnutie osobných údajov kupujúceho
            je zmluvnou požiadavkou, ktorá je potrebná na uzavretie zmluvy.
            Poskytnutie osobných údajov je podmienkou pre nákup v e-shope
            predávajúceho. Ak kupujúci neposkytne všetky požadované osobné údaje
            predávajúcemu, môže to mať za následok neuzavretie kúpnej zmluvy.
          </p>
          <br />
          <p>
            Predávajúci pri spracovaní osobných údajov postupuje v zmysle Zákona
            č. 18/2018 Z.z. o ochrane osobných údajov a spracúva iba osobné
            údaje nevyhnutné na uzavretie spotrebiteľskej zmluvy. Predávajúci
            spracúva bežné osobné údaje kupujúceho, a to meno a priezvisko,
            adresa, telefonický kontakt, emailový kontakt.
          </p>
          <br />
          <p>
            Osobné údaje kupujúceho sú v informačnom systéme predávajúceho
            uchovávané po dobu 10 rokov. Kupujúci má právo a možnosť
            aktualizovať osobné údaje v online režime na web stránke
            internetového obchodu, v zákazníckej sekcii, po prihlásení, alebo
            inou formu (e-mailom, písomne). Osobné údaje môžu byť pre účely
            plnenia spotrebiteľskej zmluvy poskytnuté tretím stranám –
            doručovacím spoločnostiam (kuriérom) a spoločnosti, ktorá spracúva
            účtovné doklady. Osobné údaje kupujúceho sa nezverejňujú.
          </p>
          <br />
          <p>
            Predávajúci môže spracúvať osobné údaje na marketingové účely
            (napríklad pre odosielanie newslettra alebo e-mailov o novinkách,
            zľavách, akciách a pod.) aj bez predchádzajúceho súhlasu kupujúceho.
            Pre tento účel predávajúci spracúva nevyhnutné údaje, ktorými sú
            meno, priezvisko a e-mailová adresa kupujúceho. Ak kupujúci
            nesúhlasí so spracovaním údajov na marketingové účely, svoj nesúhlas
            môže kupujúci kedykoľvek vyjadriť napríklad odoslaním správy na
            e-mailovú adresu predávajúceho so žiadosťou o odhlásenie z
            newslettra alebo kliknutím na link uvedený v e-mailovej správe.
            Osobné údaje využívané na marketingové účely nebudú poskytnuté
            tretím stranám, taktiež nebudú zverejnené. Osobné údaje môžu byť
            prenášané do tretích krajín s cieľom doručenia marketingových
            informácií – takouto krajinou sú Spojené štáty americké, ktorá
            zaručuje primeranú úroveň ochrany osobných údajov. Kupujúci má právo
            získať od predávajúceho potvrdenie o tom, aké osobné údaje
            kupujúceho sa spracúvajú v e-shope predávajúceho. Kupujúci má právo
            získať prístup k takýmto údajom a tiež informácie na aký účel sa
            spracúvajú, aké kategórie údajov sa spracúvajú, komu sa osobné údaje
            poskytujú, ako dlho sa osobné údaje uchovávajú, či existuje
            automatizované individuálne rozhodovanie vrátane profilovania. Prvé
            poskytnutie vyššie uvedených osobných údajov kupujúcemu je
            bezplatné. Opakované poskytnutie osobných údajov, o ktoré kupujúci
            požiada, bude spoplatnené ako administratívny poplatok vo výške 5€.
            Kupujúci môže od predávajúceho požadovať opravu alebo doplnenie
            neúplných osobných údajov, ktoré sa týkajú kupujúceho. Kupujúci môže
            žiadať vymazanie jeho osobných údajov alebo obmedzenia spracovania
            týchto údajov. Kupujúci môže aj namietať spracúvanie osobných
            údajov. Spracúvanie osobných údajov kupujúce je nevyhnutné aj na
            účely archivácie (pre splnenie povinnosti predávajúceho na základe
            právnych predpisov SR, napríklad uchovávanie účtovných dokladov po
            dobu 10 rokov). Ak bude kupujúci žiadať o vymazanie osobných údajov,
            ktoré sa spracúvajú v súvislosti s kúpnou zmluvou, jeho žiadosť môže
            byť zamietnutá.
          </p>
          <br />
          <p>
            Kupujúci má právo, aby predávajúci obmedzil spracúvanie jeho
            osobných údajov, ak kupujúci namieta správnosť osobných údajov, a to
            počas obdobia umožňujúceho predávajúcemu overiť správnosť osobných
            údajov.
          </p>
          <br />
          <p>
            Kupujúci má právo získať osobné údaje, ktoré sa ho týkajú a ktoré
            poskytol predávajúcemu, v štruktúrovanom, bežne používanom a
            strojovo čitateľnom formáte. Kupujúci má právo preniesť tieto osobné
            údaje inému prevádzkovateľovi, ak je to technicky možné. Kupujúci má
            právo namietať, ak sa jeho osobné údaje spracúvajú na účely priameho
            marketingu. Rovnako môže namietať, ak sa jeho osobné údaje
            spracúvajú na účely oprávneného záujmu predávajúceho. Kupujúci pri
            podozrení, že jeho osobné údaje sa neoprávnene spracúvajú, môže
            podať Úradu na ochranu osobných údajov návrh na začatie konania o
            ochrane osobných údajov. Vyššie uvedené informácie o ochrane
            osobných údajov sa týkajú aj predzmluvných vzťahov (t.j. registrácia
            v e-shope za účelom budúceho nákupu alebo napríklad vyžiadanie
            dopytu, cenovej ponuky či informácií o tovare a službách
            predávajúceho).
          </p>
          <br />
          <p>
            S cieľom zabezpečiť riadne fungovanie internetového obchodu môže
            predávajúci ukladať na zariadení kupujúceho malé dátové súbory –
            cookies, vďaka ktorým si internetový obchod môže na určitý čas
            uchovávať údaje o činnosti a nastaveniach (napr. prihlasovacie meno,
            jazyk, veľkosť písma a pod.). Internetový obchod predávajúceho
            používa súbory cookies na zapamätanie si používateľských nastavení
            kupujúceho a pre nevyhnutnú funkcionalitu internetového obchodu,
            prípadne na marketingové účely. Kupujúci môže všetky súbor cookies
            uložené v jeho zariadení vymazať a prípadne internetový prehliadač
            vo svojom zariadení nastaviť tak, aby znemožnil ich ukladanie. V
            takom prípade bude kupujúci pri opakovanej návšteve internetového
            obchodu pravdepodobne musieť manuálne upravovať niektoré nastavenia
            a niektoré služby alebo funkcie internetového obchodu nemusia byť
            funkčné
          </p>
          <div className="flex flex-col">
            <h6 className="mt-8">Odkazy</h6>
            <Link
              href={"http://www.nuturasprejovevitaminy.sk"}
              className="href"
            >
              [1] http://www.nuturasprejovevitaminy.sk
            </Link>
            <Link
              href={"http://www.nuturasprejovevitaminy.sk"}
              className="href"
            >
              [2] http://www.nuturasprejovevitaminy.sk
            </Link>
            <Link href={"https://www.comgate.cz"} className="href">
              [3] https://www.comgate.cz
            </Link>
            <Link href={"http://www.mhsr.sk"} className="href">
              [4] http://www.mhsr.sk
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default page;
