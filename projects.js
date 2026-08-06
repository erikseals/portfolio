// Edita este archivo para agregar, quitar o corregir proyectos.
// category: "Infraestructura" | "Datos" | "Automatizacion"
// diagram: SVG (string) que se muestra como miniatura y en el modal
// stack: lista de badges de tecnologias
// code / demo: deja "" si no vas a publicar el repo (el boton se muestra pero no enlaza)
//
// Nota: a proposito no se incluyen IDs de cuenta, VPC/subnet IDs, ARNs,
// nombres de bases de datos ni el nombre del cliente/empleador.

// --- Libreria de glifos (icon badges estilo AWS: cuadrado de color + glifo blanco) ---
const GLYPHS = {
  server: `<rect x="-7" y="-7" width="14" height="14" rx="2" class="icon-glyph"/>
    <line x1="-7" y1="-3" x2="-10" y2="-3" class="icon-glyph"/><line x1="-7" y1="3" x2="-10" y2="3" class="icon-glyph"/>
    <line x1="7" y1="-3" x2="10" y2="-3" class="icon-glyph"/><line x1="7" y1="3" x2="10" y2="3" class="icon-glyph"/>
    <line x1="-3" y1="-7" x2="-3" y2="-10" class="icon-glyph"/><line x1="3" y1="-7" x2="3" y2="-10" class="icon-glyph"/>
    <line x1="-3" y1="7" x2="-3" y2="10" class="icon-glyph"/><line x1="3" y1="7" x2="3" y2="10" class="icon-glyph"/>`,
  shield: `<path d="M0,-9 L8,-6 L8,2 Q8,8 0,11 Q-8,8 -8,2 L-8,-6 Z" class="icon-glyph"/>
    <path d="M-3,0 L-1,3 L4,-3" class="icon-glyph"/>`,
  gear: `<circle cx="0" cy="0" r="6" class="icon-glyph"/>
    <line x1="0" y1="-10" x2="0" y2="-7" class="icon-glyph"/><line x1="0" y1="7" x2="0" y2="10" class="icon-glyph"/>
    <line x1="-10" y1="0" x2="-7" y2="0" class="icon-glyph"/><line x1="10" y1="0" x2="7" y2="0" class="icon-glyph"/>
    <line x1="-7" y1="-7" x2="-5" y2="-5" class="icon-glyph"/><line x1="7" y1="7" x2="5" y2="5" class="icon-glyph"/>
    <line x1="-7" y1="7" x2="-5" y2="5" class="icon-glyph"/><line x1="7" y1="-7" x2="5" y2="-5" class="icon-glyph"/>`,
  chart: `<line x1="-8" y1="9" x2="8" y2="9" class="icon-glyph"/>
    <rect x="-7" y="0" width="4" height="9" class="icon-glyph-fill"/>
    <rect x="-1" y="-5" width="4" height="14" class="icon-glyph-fill"/>
    <rect x="5" y="-9" width="4" height="18" class="icon-glyph-fill"/>`,
  gauge: `<path d="M-8,4 A8,8 0 0,1 8,4" class="icon-glyph"/>
    <line x1="0" y1="4" x2="4" y2="-4" class="icon-glyph"/><circle cx="0" cy="4" r="1.5" class="icon-glyph-fill"/>`,
  backup: `<path d="M0,-9 L8,-6 L8,2 Q8,8 0,11 Q-8,8 -8,2 L-8,-6 Z" class="icon-glyph"/>
    <path d="M3.2,-2.8 A3.5,3.5 0 1 1 2,-5.4" class="icon-glyph"/><path d="M3.2,-6 L3.2,-2.8 L0,-2.8" class="icon-glyph"/>`,
  lock: `<rect x="-6" y="-1" width="12" height="10" rx="2" class="icon-glyph"/>
    <path d="M-4,-1 L-4,-5 Q-4,-9 0,-9 Q4,-9 4,-5 L4,-1" class="icon-glyph"/>
    <circle cx="0" cy="4" r="1.4" class="icon-glyph-fill"/>`,
  bucket: `<path d="M-7,-6 L7,-6 L5,8 L-5,8 Z" class="icon-glyph"/><line x1="-7" y1="-3" x2="7" y2="-3" class="icon-glyph"/>`,
  database: `<ellipse cx="0" cy="-6" rx="7" ry="2.5" class="icon-glyph"/>
    <path d="M-7,-6 L-7,6 Q-7,8.5 0,8.5 Q7,8.5 7,6 L7,-6" class="icon-glyph"/>
    <path d="M-7,0 Q0,2.5 7,0" class="icon-glyph"/>`,
  link: `<rect x="-9" y="-4" width="10" height="8" rx="4" class="icon-glyph"/><rect x="-1" y="-4" width="10" height="8" rx="4" class="icon-glyph"/>`,
  tag: `<path d="M-8,-6 L3,-6 L9,0 L3,6 L-8,6 Z" class="icon-glyph"/><circle cx="-4" cy="0" r="1.3" class="icon-glyph-fill"/>`,
  person: `<circle cx="0" cy="-4" r="4" class="icon-glyph"/><path d="M-7,9 Q0,-1 7,9" class="icon-glyph"/>`,
  search: `<circle cx="-1" cy="-1" r="6" class="icon-glyph"/><line x1="4" y1="4" x2="9" y2="9" class="icon-glyph"/>`,
  bolt: `<path d="M2,-9 L-6,2 L-1,2 L-3,9 L7,-2 L2,-2 Z" class="icon-glyph-fill"/>`,
  monitor: `<rect x="-9" y="-7" width="18" height="12" rx="1.5" class="icon-glyph"/>
    <line x1="0" y1="5" x2="0" y2="8" class="icon-glyph"/><line x1="-5" y1="8" x2="5" y2="8" class="icon-glyph"/>`,
  globe: `<circle cx="0" cy="0" r="8" class="icon-glyph"/>
    <ellipse cx="0" cy="0" rx="3.2" ry="8" class="icon-glyph"/>
    <line x1="-8" y1="0" x2="8" y2="0" class="icon-glyph"/>`,
};

function iconNode(cx, cy, color, glyphKey, label, sublabel) {
  const lines = [label, sublabel].filter(Boolean);
  const labelSvg = lines
    .map((line, i) => {
      const cls = i === 0 ? "icon-label" : "icon-sublabel";
      const dy = 30 + i * 11;
      return `<text x="${cx}" y="${cy + dy}" class="${cls}">${line}</text>`;
    })
    .join("");
  return `<g>
    <rect x="${cx - 18}" y="${cy - 18}" width="36" height="36" rx="8" class="icon-badge icon-badge--${color}"/>
    <g transform="translate(${cx},${cy})">${GLYPHS[glyphKey]}</g>
    ${labelSvg}
  </g>`;
}

// --- Diagrama: Gateways de Power BI ---
const gatewayDiagram = `
  <svg viewBox="0 0 460 300" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="444" height="284" rx="10" class="d-outer"/>
    <text x="18" y="24" class="d-label">AWS Cloud</text>

    <rect x="24" y="40" width="150" height="230" rx="8" class="d-outer d-outer--solid"/>
    <text x="32" y="54" class="d-label">VPC (subredes privadas)</text>

    ${awsIconNode(99, 115, "ec2", "EC2 - Gateway 1", "m7a.xlarge, Windows")}
    ${awsIconNode(99, 220, "ec2", "EC2 - Gateway 2", "m7a.xlarge, Windows")}

    ${awsIconNode(260, 90, "iam", "IAM Role", "+ Instance Profile")}
    ${awsIconNode(260, 165, "systemsmanager", "Systems Manager", "Patch Manager")}
    ${awsIconNode(260, 240, "backup", "AWS Backup", "Plan diario")}

    ${awsIconNode(370, 90, "cloudwatch", "CloudWatch", "Agent")}
    ${iconNode(370, 165, "grafana", "gauge", "Grafana", "")}
    ${awsIconNode(370, 240, "backup", "Backup Vault", "Lock 30 dias")}

    <line x1="174" y1="165" x2="212" y2="165" class="d-line"/>
    <line x1="212" y1="165" x2="242" y2="90" class="d-line"/>
    <line x1="212" y1="165" x2="242" y2="165" class="d-line"/>
    <line x1="212" y1="165" x2="242" y2="240" class="d-line"/>
    <line x1="212" y1="165" x2="352" y2="90" class="d-line-alt"/>
    <line x1="212" y1="165" x2="352" y2="165" class="d-line-alt"/>
    <line x1="278" y1="240" x2="352" y2="240" class="d-line"/>
    <line x1="370" y1="108" x2="370" y2="147" class="d-line"/>
  </svg>`;

// --- Diagrama: Resource Links & Lake Formation ---
const resourceLinksDiagram = `
  <svg viewBox="0 0 460 260" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="444" height="244" rx="10" class="d-outer"/>
    <text x="18" y="24" class="d-label">AWS - Intercambio de datos entre catalogos</text>

    ${awsIconNode(180, 70, "lakeformation", "Lake Formation", "Permisos LF-Tags")}
    ${awsIconNode(320, 70, "identitycenter", "IAM Identity Center", "Rol asumido (SSO)")}

    ${awsIconNode(70, 165, "glue", "Catalogo origen", "(unidad de negocio)")}
    ${awsIconNode(180, 165, "glue", "Glue", "Resource Link")}
    ${awsIconNode(320, 165, "athena", "Athena", "Consultas SQL")}
    ${awsIconNode(420, 165, "s3", "S3", "Resultados")}

    <line x1="88" y1="165" x2="162" y2="165" class="d-line"/>
    <line x1="180" y1="88" x2="180" y2="147" class="d-line-alt"/>
    <line x1="320" y1="88" x2="320" y2="147" class="d-line"/>
    <line x1="198" y1="165" x2="302" y2="165" class="d-line"/>
    <line x1="338" y1="165" x2="402" y2="165" class="d-line"/>
  </svg>`;

// --- Diagrama: Runbooks (placeholder) ---
const runbooksDiagram = `
  <svg viewBox="0 0 320 170" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="304" height="154" rx="10" class="d-outer"/>
    ${iconNode(80, 85, "orange", "bolt", "Evento", "EventBridge")}
    ${iconNode(230, 85, "pink", "gear", "Runbook", "SSM Automation")}
    <line x1="98" y1="85" x2="212" y2="85" class="d-line"/>
  </svg>`;

// --- Diagrama: Automatizacion on-premise con Ansible ---
const ansibleDiagram = `
  <svg viewBox="0 0 380 220" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="364" height="204" rx="10" class="d-outer"/>
    <text x="18" y="24" class="d-label">Infraestructura on-premise</text>

    ${iconNode(75, 110, "pink", "gear", "Ansible", "Control Node")}
    ${iconNode(240, 55, "orange", "server", "VM Web", "")}
    ${iconNode(240, 110, "orange", "server", "VM Aplicacion", "")}
    ${iconNode(240, 165, "orange", "server", "VM Base de datos", "")}

    <line x1="93" y1="102" x2="222" y2="58" class="d-line"/>
    <line x1="93" y1="110" x2="222" y2="110" class="d-line"/>
    <line x1="93" y1="118" x2="222" y2="163" class="d-line"/>
  </svg>`;

// --- Diagrama: Despliegue de puestos con MDT ---
const mdtDiagram = `
  <svg viewBox="0 0 380 220" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="364" height="204" rx="10" class="d-outer"/>
    <text x="18" y="24" class="d-label">Red interna</text>

    ${iconNode(75, 70, "pink", "server", "Servidor MDT", "Imagenes Windows")}
    ${iconNode(75, 165, "pink", "gear", "PowerShell", "Alta de usuarios")}

    ${iconNode(260, 50, "orange", "monitor", "Equipo usuario", "")}
    ${iconNode(260, 110, "orange", "monitor", "Equipo usuario", "")}
    ${iconNode(260, 170, "orange", "monitor", "Equipo usuario", "")}

    <line x1="93" y1="75" x2="242" y2="52" class="d-line"/>
    <line x1="93" y1="80" x2="242" y2="110" class="d-line"/>
    <line x1="93" y1="90" x2="242" y2="168" class="d-line"/>
    <line x1="75" y1="88" x2="75" y2="147" class="d-line-alt"/>
  </svg>`;

// --- Diagrama: Servidores web y de gestion interna ---
const webServersDiagram = `
  <svg viewBox="0 0 380 200" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="364" height="184" rx="10" class="d-outer"/>
    <text x="18" y="24" class="d-label">Infraestructura on-premise</text>

    ${iconNode(75, 100, "red", "person", "Usuarios", "internos")}
    ${iconNode(250, 55, "orange", "globe", "Servidor Web", "")}
    ${iconNode(250, 145, "orange", "server", "Gestion interna", "")}

    <line x1="93" y1="92" x2="232" y2="58" class="d-line"/>
    <line x1="93" y1="108" x2="232" y2="142" class="d-line"/>
  </svg>`;

// --- Diagrama: Servidores Linux con motor Informix ---
const informixDiagram = `
  <svg viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="384" height="164" rx="10" class="d-outer"/>

    ${iconNode(80, 90, "orange", "server", "Servidor Linux", "")}
    ${iconNode(200, 90, "purple", "database", "Informix", "Motor de BD")}
    ${iconNode(320, 90, "red", "person", "Direccion de", "Material - Armada")}

    <line x1="98" y1="90" x2="182" y2="90" class="d-line"/>
    <line x1="218" y1="90" x2="302" y2="90" class="d-line"/>
  </svg>`;

// --- Diagrama: Pipeline de Discovery y Carga de Data Contracts ---
const dataContractsDiagram = `
  <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="384" height="204" rx="10" class="d-outer"/>
    <text x="18" y="24" class="d-label">Microsoft Fabric</text>

    ${iconNode(70, 70, "purple", "link", "Bitbucket", "API discovery")}
    ${iconNode(200, 70, "orange", "server", "Data Gateway", "On-premises")}
    ${iconNode(330, 70, "pink", "gear", "Fabric Pipeline", "Web + Filter + ForEach")}

    ${iconNode(330, 165, "orange", "chart", "Notebook", "Hash SHA-256")}
    ${iconNode(200, 165, "purple", "database", "Cosmos DB", "Upsert contratos")}
    ${iconNode(70, 165, "grafana", "gauge", "Power BI", "Importar")}

    <line x1="88" y1="70" x2="182" y2="70" class="d-line"/>
    <line x1="218" y1="70" x2="312" y2="70" class="d-line"/>
    <line x1="330" y1="88" x2="330" y2="147" class="d-line"/>
    <line x1="312" y1="165" x2="218" y2="165" class="d-line"/>
    <line x1="182" y1="165" x2="88" y2="165" class="d-line"/>
  </svg>`;

const PROJECTS = [
  {
    title: "Gateways de Power BI en AWS",
    shortDescription:
      "Terraform para desplegar y operar 2 Gateways de Power BI sobre EC2, con parcheo, monitoreo y backups automatizados.",
    fullDescription:
      "Infraestructura como codigo (Terraform) para desplegar 2 gateways de Power BI sobre instancias EC2 " +
      "(Windows Server, familia m7a) en subredes privadas de una VPC, con volumen raiz gp3 cifrado y " +
      "hardening de metadatos (IMDSv2 obligatorio). Cada instancia tiene su propio rol IAM e instance " +
      "profile con politicas administradas y una politica personalizada de minimo privilegio. El parcheo " +
      "se automatiza con Systems Manager Patch Manager en ventanas de mantenimiento escalonadas (una " +
      "semana de diferencia entre nodos, alineadas al Patch Tuesday de Microsoft). El estado de las " +
      "instancias se monitoriza con CloudWatch Agent y se visualiza en Grafana. La continuidad se cubre " +
      "con AWS Backup: plan diario con retencion de 30 dias y vault con bloqueo de inmutabilidad.",
    category: "Infraestructura",
    stack: [
      "Terraform",
      "EC2 (Windows Server)",
      "VPC",
      "IAM",
      "Systems Manager",
      "AWS Backup",
      "CloudWatch",
      "Grafana",
    ],
    code: "",
    demo: "",
    diagram: gatewayDiagram,
  },
  {
    title: "Resource Links & Lake Formation",
    shortDescription:
      "Automatizacion de Resource Links de Glue y permisos de Lake Formation por LF-Tags para compartir datos entre unidades de negocio.",
    fullDescription:
      "Automatizacion con Terraform de un patron de intercambio de datos entre catalogos: por cada base " +
      "de datos configurada se crea un AWS Glue Resource Link, y el acceso se concede mediante permisos " +
      "de Lake Formation basados en LF-Tags (por unidad de negocio) en lugar de por recurso individual, " +
      "de forma que nuevas bases o tablas etiquetadas quedan cubiertas automaticamente. El consumo se " +
      "hace a traves de un rol IAM asumido via AWS IAM Identity Center (SSO), con una politica de minimo " +
      "privilegio (lectura de catalogo Glue, GetDataAccess de Lake Formation y ejecucion de consultas " +
      "Athena). Los resultados de Athena se guardan en un bucket S3 privado, cifrado (SSE-S3), con " +
      "bloqueo de acceso publico y expiracion automatica de objetos a los 30 dias; el workgroup de " +
      "Athena fuerza esa configuracion y publica metricas en CloudWatch.",
    category: "Datos",
    stack: [
      "Terraform",
      "AWS Glue",
      "Lake Formation",
      "IAM Identity Center",
      "Athena",
      "S3",
    ],
    code: "",
    demo: "",
    diagram: resourceLinksDiagram,
  },
  {
    title: "Runbooks de Automatizacion",
    shortDescription:
      "TODO: describe aqui tus runbooks (por ejemplo AWS Systems Manager Automation).",
    fullDescription:
      "TODO: reemplaza este texto con la descripcion real de tus runbooks: que problema resuelven, que " +
      "pasos automatizan, con que servicios (por ejemplo AWS Systems Manager Automation, Lambda, " +
      "EventBridge) y con que frecuencia o disparador se ejecutan.",
    category: "Automatizacion",
    stack: ["TODO"],
    code: "",
    demo: "",
    diagram: runbooksDiagram,
  },
  {
    title: "Automatizacion on-premise con Ansible",
    shortDescription:
      "Despliegue y configuracion de infraestructura on-premise mediante playbooks de Ansible sobre maquinas virtuales.",
    fullDescription:
      "Automatizacion del despliegue y configuracion de servidores Linux on-premise (web, aplicacion y " +
      "base de datos) mediante playbooks de Ansible sobre maquinas virtuales, estandarizando la puesta " +
      "en marcha de infraestructura critica y reduciendo el trabajo manual repetitivo.",
    category: "On-Premise",
    stack: ["Ansible", "Linux", "Virtualizacion", "Automatizacion"],
    code: "",
    demo: "",
    diagram: ansibleDiagram,
  },
  {
    title: "Despliegue de puestos de trabajo con MDT",
    shortDescription:
      "Plataformado de equipos de usuario final con Microsoft Deployment Toolkit y automatizacion con PowerShell.",
    fullDescription:
      "Plataformado (imaging) de maquinas de usuario final mediante Microsoft Deployment Toolkit (MDT), " +
      "automatizacion de la creacion y configuracion de usuarios con PowerShell, y configuracion de " +
      "sistemas internos (Windows, Office 365) para dejar puestos de trabajo listos para produccion.",
    category: "On-Premise",
    stack: ["Windows MDT", "PowerShell", "Active Directory", "Office 365"],
    code: "",
    demo: "",
    diagram: mdtDiagram,
  },
  {
    title: "Servidores web y de gestion interna",
    shortDescription:
      "Montaje de servidores web y de gestion interna sobre infraestructura on-premise de alta disponibilidad.",
    fullDescription:
      "Montaje y configuracion de servidores web y servidores de gestion interna sobre infraestructura " +
      "on-premise, junto con la administracion de redes y cableado estructurado, garantizando alta " +
      "disponibilidad en un entorno de alta exigencia.",
    category: "On-Premise",
    stack: ["Linux", "Servidor Web", "Redes", "Alta disponibilidad"],
    code: "",
    demo: "",
    diagram: webServersDiagram,
  },
  {
    title: "Servidores Linux con motor Informix",
    shortDescription:
      "Instalacion y administracion de servidores Linux con motor de base de datos Informix.",
    fullDescription:
      "Instalacion, configuracion y administracion de servidores Linux con motor de base de datos " +
      "Informix para la Direccion de Material de la Armada del Ecuador, incluyendo monitorizacion, " +
      "operaciones SQL y respaldos periodicos para asegurar la disponibilidad de la informacion.",
    category: "On-Premise",
    stack: ["Linux", "Informix", "SQL", "Backups"],
    code: "",
    demo: "",
    diagram: informixDiagram,
  },
  {
    title: "Pipeline de Discovery y Carga de Data Contracts",
    shortDescription:
      "Pipeline en Microsoft Fabric que descubre data contracts en un repositorio Git, valida cambios con hash SHA-256 y los carga en Cosmos DB para Power BI.",
    fullDescription:
      "Diseno y despliegue de un pipeline de discovery y carga incremental de 'data contracts' (YAML) " +
      "para alimentar un informe de Power BI. El servidor de configuracion que aloja los YAML no permite " +
      "listar ficheros, asi que el discovery real se resuelve contra la API de un repositorio Git, " +
      "filtrando por un patron de nombre (dcontract-*). Se evaluaron dos rutas de computo -Azure Function " +
      "y Microsoft Fabric-, llegando a validar por completo la primera (Python, Terraform, Managed " +
      "Identity, simulacion local con Docker) antes de decidirse por Fabric al poder reutilizar un " +
      "On-Premises Data Gateway ya desplegado, lo que simplifico la arquitectura. El pipeline en Fabric " +
      "encadena una llamada Web de discovery, un filtro por patron y un ForEach secuencial que invoca un " +
      "Notebook por cada contrato: el notebook calcula un hash SHA-256, lo compara contra lo ya " +
      "almacenado en Cosmos DB, y hace upsert solo si el contrato es nuevo o cambio. El entorno de " +
      "ejecucion usa un Environment de Fabric con las librerias necesarias preinstaladas, ya que la " +
      "instalacion interactiva de paquetes esta deshabilitada al ejecutar desde pipeline. Power BI " +
      "Desktop se conecta a Cosmos DB en modo Importar via el conector nativo.",
    category: "Datos",
    stack: [
      "Microsoft Fabric",
      "Cosmos DB",
      "Python",
      "Notebook (Spark)",
      "API Bitbucket",
      "On-Premises Data Gateway",
      "Power BI",
    ],
    code: "",
    demo: "",
    diagram: dataContractsDiagram,
  },
];
