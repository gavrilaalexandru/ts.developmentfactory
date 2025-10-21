// declararea variabilelor

const myName: string = 'Bogdan'; // variabila constanta de tip string

// typescript este un decorator pentru javascript

// daca compilam ceva de genul "const myName: string = 29" chiar daca
// nu se va compila din punct de vedere typescript, codul este cod
// valid de js

// tot codul de js este cod valid de ts

// tsc --init pentru tsconfig.json
// acum in loc sa compilam fiecare fisier pe rand
// putem scrie doar "tsc" si va compila toate fisierele
// din proiectul in care se afla tsconfig.json (configurarea default)

// putem schimba acest lucru modificand setarea "rootDir"
// de asemenea putem selecta si directorul unde se duc fisierele in urma compilarii
// setarea "outDir"; se obicei un folder numit "dist" (distribution)

// tsc --watch pentru a pornit compilarea in modul watch
// de fiecare data cand dam save intr-un fisier de ts se recompileaza codul

// * PRIMITIVE
// string --> insiruirea de caractere
const name1: string = 'Alex';
// number --> inglobeaza toate tipurile de numere (intregi, cu virgula, etc.)
const age1: number = 25;
// boolean --> true sau false
const isMinor: boolean = false;

// * COLECTII FORMATE CU TIPURILE PRIMITIVE
// array
const people: string[] = ['Alex', 'Mihai', 'Bogdan'];
// tuplu (tuple) --> se stie exact lungimea, tipul datelor si ordinea acestora
const tuple: [string, number, boolean] = ['Bogdan', 10, true];

// * TIPUL ANY
let t: any = [1, 'test', false]; // un array cu diverse tipuri
t = 1; // acum are doar valoarea 1

// * TIPUL UNKNOWN
let whatsThis: unknown = []; // unknown poate fi atribuit doar unei variabile de tipul any
// u = 12; // unknown poate lua absolut orice valoare, similar cu any
let myNumber: number;
// myNumber = whatsThis; // eroare, unknown nu este atribuibil catre tipul number

// * TIPUL NEVER
let notGoingToHappen: never; // tipului never nu i se poate atribui niciun fel de alt tip (nici macar any)
// nu este menit pentru variabile, menit pentru tipul de return al unor functii
function displayError(): never {
  // typescript arata ca aceasta functie returneaza void, dar este defapt never (deoarece arunca o eroare si nu mai continua executia codului,
  // cum ar fi fost daca era void)
  // executia nu ajunge niciodata in afara functiei
  throw new Error('Something bad happened');
}

function displayName(name: string) {
  console.log(name);
}

displayName('Bogdan');
// displayName(null); // strict null checks

// * DEBUGGING
// typescript nu poate fi rulat nici in node.js, nici in browser (in niciunul din mediile care ruleaza nativ javascript),
// poate fi rulat doar de catre compilatorul de typescript
// --> run & debug in vscode --> create launch.json file cu node.js ca template
// iar din tsconfig.json setam sourceMap: true (deja setat in versiunile mai noi)
// fisierul .map mapeaza fisierul de javascript la fisierul de typescript
// --> din launch.json la "program" schimbam din src/index.ts in dist/index.js
// F5 --> start debugging

// * FUNCTII

function displayFullName(firstName: string, lastName: string): string {
  const fullName = `${firstName} ${lastName}`;
  console.log(fullName);
  return fullName;
}

displayFullName('Test', 'test');

// si functiile reprezinta un tip in typescript deci putem declara o
// variabila ca fiind o referinta catre o functie

let myFunc: (firstName: string, lastName: string) => string;

myFunc = displayFullName;
myFunc('Ion', 'Popescu');

// * OBIECTE

const person = {
  // o structura de mai multe tipuri
  firstName: 'Alex',
  lastName: 'Petre',
  age: 30,
};

function displayPerson(person: { firstName: string; lastName: string }) {
  console.log(`${person.firstName} ${person.lastName}`);
}

// incorect displayPerson('Test');
// incorect displayPerson('Test', 'test');
displayPerson(person); // campurile din person respecta structura din functia noastra
// dar putem adauga un camp nou, pe care nu il putem accesa in functia noastra

const person2: { firstName: string; lastName: string; age: number } = {
  firstName: 'Alexandru',
  lastName: 'Test',
  age: 30,
};

function displayPerson2(person: {
  firstName: string;
  lastName: string;
  age: number;
}) {
  console.log(`${person.firstName} ${person.lastName}`);
}

displayPerson2(person2);

// * ALIASURI

// type Masina = {
// type alias pt structura masina
//   manufacturer: string;
//   model: string;
//   horsePower: number;
// }; // cand se declara tipul folosim majuscula
// am creat tipul custom "Masina"

const masina1: Masina = {
  manufacturer: 'Audi',
  model: 'Q8',
  horsePower: 300,
};

// console.log(masina1);

function displayCar(masina: Masina) {
  console.log(
    `Modelul masinii este ${masina.manufacturer} ${masina.model} si are ${masina.horsePower} cai putere.`
  );
}

displayCar(masina1);

// * CAMPURI OPTIONALE
// sa zicem ca ne dorim sa avem si culoarea masinii, dar nu vrem asta pentru toate masiniile
// asa ca in loc sa creeam un tip nou, marcam campul cu "?" (optional/nullable)

type Masina = {
  manufacturer: string;
  model: string;
  horsePower: number;
  color?: string | undefined; // campul optional string sau undefined (optional de pus undefined)
};

const masina2: Masina = {
  manufacturer: 'BMW',
  model: 'Seria 7',
  horsePower: 350,
  // merge si fara campul optional (culoare)
};

// * TIPURI UNIFICATE
// daca facem o proprietate optionala, aceasta poate fi de tipul declarat sau undefined
// string | undefined --> union type (daca avem camp optional se face by default)
// dar putem face si noi acelasi lucru si pentru campuri care nu sunt necesar optionale

let input: number | string = 13;
input = 'megaBIGnumber';

function print(input: number | string) {
  if (typeof input == 'string') {
    console.log(input.toLowerCase());
  } else {
    console.log(input);
  }
}
print(input);

// * INTERFETE
// se recomanda utilizarea interfetelor, nu a tipurilor
// cea mai mare diferenta este ca o interfata poate fi extinsa foarte usor

interface Company {
  // fara egal, doar acolade
  name: string;
  employees: number;
}

interface InternationalCompany extends Company {
  country: string;
}

const myCompany: Company = {
  name: 'My Company',
  employees: 10000,
};

const myInternationalCompany: InternationalCompany = {
  // putem face acelasi lucru si cu types, dar trebuie sa folosim intersections
  name: 'My International Company',
  employees: 25000,
  country: 'USA',
};

// extindem tipul masina
type MasinaElectrica = Masina & {
  // procesul de intersection
  isElectric: boolean;
  batteryLife: number;
};
