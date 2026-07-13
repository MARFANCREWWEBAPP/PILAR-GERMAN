export type PublicCopy = {
  home: Record<string, string>
  rsvp: Record<string, string>
}

export type PublicCopyField = {
  key: string
  label: string
  multiline?: boolean
  hint?: string
}

export type PublicCopySection = {
  key: keyof PublicCopy
  title: string
  eyebrow: string
  fields: PublicCopyField[]
}

export const defaultPublicCopy: PublicCopy = {
  home: {
    loadingEyebrow: 'Private club loading',
    loadingSubtitle: 'Catorce horas. Una boda. Un invitado internacional secreto.',
    loadingPrimaryCta: 'Entrar al club',
    loadingPrivateCta: 'Menu privado',
    navAccessCta: 'Access',
    heroTags: 'Wedding edition | Finca takeover | Black / white | QR only',
    heroKicker: 'Catorce horas. Una boda. Un secreto internacional.',
    heroTitleLine1: 'No Sleep',
    heroTitleLine2: 'Club',
    heroDescription: 'Catorce horas. Una boda. Un invitado internacional secreto. Y cero ganas de irse a casa.',
    festivalCodeLabel: 'Festival code',
    festivalCode: 'NSWC-0612',
    festivalCodeNote: 'Guest passport / private access / finca field',
    liveNote: 'Live visual system · Move your cursor',
    primaryCta: 'Create my passport',
    secondaryCta: 'View festival pass',
    wristbandBadge: 'Wristband active',
    stageBadgeLabel: 'Stage',
    stageBadgeText: 'Finca San Isidro',
    fincaAlt: 'Finca Pilar y German',
    verticalStripe: 'No sleep club',
    cardEyebrow: 'P&G wedding passport',
    cardDate: '06.12',
    lineupTardeoStage: 'Tardeo',
    lineupTardeoTitle: 'Zambomba y flamenquito',
    lineupTardeoNote: 'Arranque divertido, castizo y con cero solemnidad innecesaria.',
    lineupDanceStage: 'Main moment',
    lineupDanceTitle: 'Baile novios',
    lineupDanceNote: 'El primer gran momento de pista antes de que suba la noche.',
    lineupDjStage: 'Secret booth',
    lineupDjTitle: 'Secret DJ',
    lineupDjNote: 'Invitado internacional secreto. El nombre se guarda hasta que toque.',
    lineupPartyStage: 'Club mode',
    lineupPartyTitle: 'No Sleep Wedding Party',
    lineupPartyNote: 'Cambio de piel: luces, barra, pista y cero ganas de irse a casa.',
    marquee: 'NO SLEEP WEDDING CLUB · 17:30 Tardeo · Zambomba y flamenquito · 20:00 Secret DJ · 00:00 No Sleep Wedding Party ·'
  },
  rsvp: {
    homeBackLabel: 'Home',
    brandPanelEyebrow: 'Passport desk',
    heroTitleLine1: 'Claim your',
    heroTitleLine2: 'pass',
    heroDescription: 'Si te registras, vienes a la fiesta. Puedes añadir un acompañante máximo y elegir si usarás el bus desde Cártama estación hasta Finca San Isidro.',
    cardEyebrow: 'Festival passport',
    cardCode: 'NSWC-0612',
    formBadge: 'Access form',
    formEyebrow: 'NO SLEEP WEDDING CLUB',
    formTitle: 'Guest passport',
    stepGuest: '01 · Guest',
    stepCompanion: '02 · Companion',
    stepBus: '03 · Bus',
    firstNameLabel: 'Nombre',
    firstNamePlaceholder: 'Pilar',
    lastNameLabel: 'Apellidos',
    lastNamePlaceholder: 'García',
    emailLabel: 'Email',
    emailPlaceholder: 'tu@email.com',
    phoneLabel: 'Teléfono',
    phonePlaceholder: '+34 600 000 000',
    companionLabel: 'Acompañante',
    companionNo: 'No llevo acompañante',
    companionYes: 'Sí, llevo 1 acompañante',
    busLabel: 'Bus',
    busNo: 'No voy en bus',
    busYes: 'Sí, bus Cártama estación → finca',
    companionFirstNameLabel: 'Nombre acompañante',
    companionFirstNamePlaceholder: 'Nombre',
    companionLastNameLabel: 'Apellidos acompañante',
    companionLastNamePlaceholder: 'Apellidos',
    companionHelp: 'Máximo un acompañante. Se generará un passport independiente para esta persona.',
    notesLabel: 'Nota para producción',
    notesPlaceholder: 'Grupo, comentario o detalle operativo importante.',
    submitLabel: 'Confirmar y emitir passport',
    submittingLabel: 'Issuing passport...',
    successTitle: 'Passport issued',
    primaryTicketLabel: 'Passport invitado',
    companionTicketLabel: 'Passport acompañante',
    anotherGuestLabel: 'Registrar otra persona'
  }
}

export const publicCopySections: PublicCopySection[] = [
  {
    key: 'home',
    title: 'Portada pública',
    eyebrow: 'Página inicial que ven al abrir el link',
    fields: [
      { key: 'loadingEyebrow', label: 'Loading · etiqueta' },
      { key: 'loadingSubtitle', label: 'Loading · frase', multiline: true },
      { key: 'loadingPrimaryCta', label: 'Loading · botón entrada' },
      { key: 'loadingPrivateCta', label: 'Loading · botón privado' },
      { key: 'navAccessCta', label: 'Cabecera · botón acceso' },
      { key: 'heroTags', label: 'Chips superiores', hint: 'Separar con |' },
      { key: 'heroKicker', label: 'Hero · frase pequeña' },
      { key: 'heroTitleLine1', label: 'Hero · título línea 1' },
      { key: 'heroTitleLine2', label: 'Hero · título línea 2' },
      { key: 'heroDescription', label: 'Hero · descripción', multiline: true },
      { key: 'festivalCodeLabel', label: 'Código · etiqueta' },
      { key: 'festivalCode', label: 'Código · valor' },
      { key: 'festivalCodeNote', label: 'Código · nota', multiline: true },
      { key: 'liveNote', label: 'Nota visual inferior' },
      { key: 'primaryCta', label: 'Botón principal' },
      { key: 'secondaryCta', label: 'Botón secundario' },
      { key: 'wristbandBadge', label: 'Badge flotante izquierdo' },
      { key: 'stageBadgeLabel', label: 'Badge finca · etiqueta' },
      { key: 'stageBadgeText', label: 'Badge finca · texto' },
      { key: 'fincaAlt', label: 'Texto alternativo imagen finca' },
      { key: 'verticalStripe', label: 'Franja vertical de la imagen' },
      { key: 'cardEyebrow', label: 'Tarjeta finca · etiqueta' },
      { key: 'cardDate', label: 'Tarjeta finca · fecha' },
      { key: 'lineupTardeoStage', label: 'Line-up 1 · etapa' },
      { key: 'lineupTardeoTitle', label: 'Line-up 1 · título' },
      { key: 'lineupTardeoNote', label: 'Line-up 1 · nota', multiline: true },
      { key: 'lineupDanceStage', label: 'Line-up 2 · etapa' },
      { key: 'lineupDanceTitle', label: 'Line-up 2 · título' },
      { key: 'lineupDanceNote', label: 'Line-up 2 · nota', multiline: true },
      { key: 'lineupDjStage', label: 'Line-up 3 · etapa' },
      { key: 'lineupDjTitle', label: 'Line-up 3 · título' },
      { key: 'lineupDjNote', label: 'Line-up 3 · nota', multiline: true },
      { key: 'lineupPartyStage', label: 'Line-up 4 · etapa' },
      { key: 'lineupPartyTitle', label: 'Line-up 4 · título' },
      { key: 'lineupPartyNote', label: 'Line-up 4 · nota', multiline: true },
      { key: 'marquee', label: 'Marquesina inferior', multiline: true }
    ]
  },
  {
    key: 'rsvp',
    title: 'Registro invitados',
    eyebrow: 'Formulario que recibe el invitado',
    fields: [
      { key: 'homeBackLabel', label: 'Botón volver' },
      { key: 'brandPanelEyebrow', label: 'Etiqueta panel izquierdo' },
      { key: 'heroTitleLine1', label: 'Título línea 1' },
      { key: 'heroTitleLine2', label: 'Título línea 2' },
      { key: 'heroDescription', label: 'Descripción principal', multiline: true },
      { key: 'cardEyebrow', label: 'Tarjeta imagen · etiqueta' },
      { key: 'cardCode', label: 'Tarjeta imagen · código' },
      { key: 'formBadge', label: 'Formulario · badge' },
      { key: 'formEyebrow', label: 'Formulario · etiqueta' },
      { key: 'formTitle', label: 'Formulario · título' },
      { key: 'stepGuest', label: 'Paso 1' },
      { key: 'stepCompanion', label: 'Paso 2' },
      { key: 'stepBus', label: 'Paso 3' },
      { key: 'firstNameLabel', label: 'Nombre · label' },
      { key: 'firstNamePlaceholder', label: 'Nombre · placeholder' },
      { key: 'lastNameLabel', label: 'Apellidos · label' },
      { key: 'lastNamePlaceholder', label: 'Apellidos · placeholder' },
      { key: 'emailLabel', label: 'Email · label' },
      { key: 'emailPlaceholder', label: 'Email · placeholder' },
      { key: 'phoneLabel', label: 'Teléfono · label' },
      { key: 'phonePlaceholder', label: 'Teléfono · placeholder' },
      { key: 'companionLabel', label: 'Acompañante · label' },
      { key: 'companionNo', label: 'Acompañante · opción no' },
      { key: 'companionYes', label: 'Acompañante · opción sí' },
      { key: 'busLabel', label: 'Bus · label' },
      { key: 'busNo', label: 'Bus · opción no' },
      { key: 'busYes', label: 'Bus · opción sí' },
      { key: 'companionFirstNameLabel', label: 'Nombre acompañante · label' },
      { key: 'companionFirstNamePlaceholder', label: 'Nombre acompañante · placeholder' },
      { key: 'companionLastNameLabel', label: 'Apellidos acompañante · label' },
      { key: 'companionLastNamePlaceholder', label: 'Apellidos acompañante · placeholder' },
      { key: 'companionHelp', label: 'Ayuda acompañante', multiline: true },
      { key: 'notesLabel', label: 'Notas · label' },
      { key: 'notesPlaceholder', label: 'Notas · placeholder', multiline: true },
      { key: 'submitLabel', label: 'Botón enviar' },
      { key: 'submittingLabel', label: 'Botón enviando' },
      { key: 'successTitle', label: 'Éxito · título' },
      { key: 'primaryTicketLabel', label: 'Éxito · botón invitado' },
      { key: 'companionTicketLabel', label: 'Éxito · botón acompañante' },
      { key: 'anotherGuestLabel', label: 'Éxito · registrar otra persona' }
    ]
  }
]
