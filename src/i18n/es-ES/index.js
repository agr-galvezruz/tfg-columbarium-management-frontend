// This is just an example,
// so you can safely delete all default props below

export default {
  routes: {
    dashboard: 'Inicio',
    crypt: 'Cripta',
    buildings: 'Edificios',
    rooms: 'Salas',
    rows: 'Filas',
    niches: 'Nichos',
    urns: 'Urnas',
    map: 'Mapa',
    record: 'Registro',
    people: 'Personas',
    caskets: 'Cofres',
    configuration: 'Administración',
    users: 'Usuarios',
    management: 'Gestión',
    reservations: 'Reservas',
    deposits: 'Depósitos',
    relocations: 'Reubicaciones',
    help: 'Ayuda',
    guide: 'Guía de usuario'
  },
  general_texts: {
    welcome: 'Bienvenido',
    logout: 'Cerrar sesión',
    edit: 'Editar',
    delete: 'Eliminar',
    loading: 'Cargando...',
    no_data: 'No se han encontrado registros.',
    pagination_records: 'Registros',
    pagination_of: 'de',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    save: 'Guardar',
    continue: 'Continuar',
    back: 'Atrás',
    close: 'Cerrar'
  },
  database_messages: {
    incorrect_login_data: 'Identificación o contraseña incorrecta.',
    network_error: 'Problema con la conexión al servidor.',
    database_conection_unauthorized: 'No autorizado, vuelva a iniciar sesión',
    database_conection_error: 'Problema con la conexión a la base de datos. Por favor, compruebe el estado de la misma.'
  },
  components: {
    phone: {
      data_required: 'Dato obligatorio',
      incorrect_number: 'El número de teléfono está incompleto o incorrecto',
      number_required: 'Se requiere número de teléfono fijo o móvil personal',
      search_country: 'Buscar país',
      none_match: 'Ninguna coincidencia'
    },
    date: {
      continue: 'Aceptar',
      date_range: 'Rango de fechas',
      date_format: 'DD/MM/YYYY',
      close: 'Cerrar',
      incorrect_format: 'Formato de fecha incorrecto',
      date_current_locale: {
        days: 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado',
        daysShort: 'D_L_M_Mi_J_V_S',
        months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre',
        monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'
      }
    },
    form_components: {
      data_required: 'Dato obligatorio',
      phone_format: 'Formato de teléfono incorrecto',
      postal_code_format: 'Código postal incorrecto',
      email_format: 'Correo electrónico incorrecto',
      no_data: 'Sin datos',
      check_form: 'Revisar los datos introducidos',
      timer_selector: 'Selector de hora',
      cant_zero: 'El importe debe de ser mayor que cero',
      no_selected: 'Seleccione una opción',
      no_options: 'No hay opciones disponibles',
    },
    filter: {
      add_filter: 'Filtrar',
      filtering: 'Filtrando',
      search_filter: 'Buscar filtro',
      search: 'Buscar',
      cancel: 'Cancelar',
      back: 'Atrás'
    },
    status: {
      available: 'Disponible',
      reserved: 'Reservado',
      occupied: 'Ocupado',
      expired: 'Caducado',
      disabled: 'Inhabilitado'
    },
    rol: {
      admin: 'Administrador',
      consultant: 'Consultor'
    }
  },
  pages: {
    login: {
      id: 'Identificador',
      id_placeholder: 'Introduzca su identificador',
      password: 'Contraseña',
      password_placeholder: 'Introduzca su contraseña',
      login: 'Iniciar sesión'
    },
    building: {
      entity: 'Edificio',
      list_title: 'Edificios',
      details_title: 'Detalles del edificio',
      add_building: 'Añadir edificio',
      internal_code: 'Código interno',
      internal_code_placeholder: 'Código interno del edificio',
      name: 'Nombre',
      name_placeholder: 'Nombre completo del edificio',
      address: 'Dirección',
      address_placeholder: 'Dirección del edificio',
      description: 'Descripción',
      description_placeholder: 'Descripción sobre el edificio',
      no_data: 'No se han encontrado edificios.',
      modal_create_title: 'Añadir edificio',
      modal_edit_title: 'Editar edificio',
      modal_delete_title: 'Eliminar edificio',
      modal_delete_text1: '¿Está seguro que quiere eliminar el edificio',
      modal_delete_text2: 'Todos los datos que dependen de este edificio serán eliminados.',
      unique_error_internal_code: 'El código interno introducido ya está en uso.',
      unique_error_name: 'El nombre del edificio introducido ya está en uso.',
      successfully_created: 'El edificio ha sido creado correctamente.',
      successfully_edited: 'El edificio ha sido editado correctamente.',
      successfully_deleted: 'El edificio ha sido eliminado correctamente.',
      delete_error: 'El edificio no ha sido encontrado.'
    },
    room: {
      entity: 'Sala',
      list_title: 'Salas',
      details_title: 'Detalles de la sala',
      rooms_building: 'Salas del edificio',
      add_room: 'Añadir sala',
      internal_code: 'Código interno',
      internal_code_placeholder: 'Código de la sala',
      location: 'Ubicación',
      location_placeholder: 'Ubicación de la sala',
      building_id: 'Edificio al que pertenece',
      description: 'Descripción',
      description_placeholder: 'Descripción sobre la sala',
      no_data: 'No se han encontrado salas.',
      modal_create_title: 'Añadir sala',
      modal_edit_title: 'Editar sala',
      modal_delete_title: 'Eliminar sala',
      modal_delete_text1: '¿Está seguro que quiere eliminar la sala',
      modal_delete_text2: 'Todos los datos que dependen de esta sala serán eliminados.',
      unique_error_internal_code: 'El código interno introducido ya está en uso para este edificio.',
      successfully_created: 'La sala ha sido creada correctamente.',
      successfully_edited: 'La sala ha sido editada correctamente.',
      successfully_deleted: 'La sala ha sido eliminada correctamente.',
      delete_error: 'La sala no ha sido encontrada.'
    },
    row: {
      entity: 'Fila',
      list_title: 'Filas',
      details_title: 'Detalles de la fila',
      rows_room: 'Filas de la sala',
      add_row: 'Añadir fila',
      internal_code: 'Código interno',
      internal_code_placeholder: 'Código de la fila',
      building_id: 'Edificio al que pertenece',
      room_id: 'Sala a la que pertenece',
      room_no_options: 'Seleccione un edificio antes',
      description: 'Descripción',
      description_placeholder: 'Descripción sobre la fila',
      no_data: 'No se han encontrado filas.',
      modal_create_title: 'Añadir fila',
      modal_edit_title: 'Editar fila',
      modal_delete_title: 'Eliminar fila',
      modal_delete_text1: '¿Está seguro que quiere eliminar la fila',
      modal_delete_text2: 'Todos los datos que dependen de esta fila serán eliminados.',
      unique_error_internal_code: 'El código interno introducido ya está en uso para esta sala.',
      successfully_created: 'La fila ha sido creada correctamente.',
      successfully_edited: 'La fila ha sido editada correctamente.',
      successfully_deleted: 'La fila ha sido eliminada correctamente.',
      delete_error: 'La fila no ha sido encontrada.'
    },
    niche: {
      entity: 'Nicho',
      list_title: 'Nichos',
      details_title: 'Detalles del nicho',
      niches_row: 'Nichos de la fila',
      add_niche: 'Añadir nicho',
      internal_code: 'Código interno',
      internal_code_placeholder: 'Código del nicho',
      building_id: 'Edificio al que pertenece',
      room_id: 'Sala a la que pertenece',
      room_no_options: 'Seleccione un edificio antes',
      row_id: 'Fila a la que pertenece',
      row_no_options: 'Seleccione una sala antes',
      storage_quantity: 'Almacenamiento (Uds)',
      storage_quantity_placeholder: 'Cantidad de almacenamiento del nicho',
      description: 'Descripción',
      description_placeholder: 'Descripción sobre el nicho',
      no_data: 'No se han encontrado nichos.',
      modal_create_title: 'Añadir nicho',
      modal_edit_title: 'Editar nicho',
      modal_delete_title: 'Eliminar nicho',
      modal_delete_text1: '¿Está seguro que quiere eliminar el nicho',
      modal_delete_text2: 'Todos los datos que dependen de este nicho serán eliminados.',
      unique_error_internal_code: 'El código interno introducido ya está en uso para esta fila.',
      successfully_created: 'El nicho ha sido creado correctamente.',
      successfully_edited: 'El nicho ha sido editado correctamente.',
      successfully_deleted: 'El nicho ha sido eliminado correctamente.',
      delete_error: 'El nicho no ha sido encontrado.'
    },
    urn: {
      entity: 'Urna',
      list_title: 'Urnas',
      details_title: 'Detalles de la urna',
      urns_niche: 'Urnas del nicho',
      urn_reservation: 'Reservas de la urna',
      add_urn: 'Añadir urna',
      internal_code: 'Código interno',
      internal_code_placeholder: 'Código de la urna',
      building_id: 'Edificio al que pertenece',
      room_id: 'Sala a la que pertenece',
      room_no_options: 'Seleccione un edificio antes',
      row_id: 'Fila a la que pertenece',
      row_no_options: 'Seleccione una sala antes',
      niche_id: 'Nicho al que pertenece',
      niche_no_options: 'Seleccione una fila antes',
      urn_id: 'Urna a la que pertenece',
      urn_no_options: 'Seleccione un nicho antes',
      status: 'Estado',
      status_placeholder: 'Estado de la urna',
      description: 'Descripción',
      description_placeholder: 'Descripción sobre la urna',
      no_data: 'No se han encontrado urnas.',
      modal_create_title: 'Añadir urna',
      modal_edit_title: 'Editar urna',
      modal_delete_title: 'Eliminar urna',
      modal_delete_text1: '¿Está seguro que quiere eliminar la urna',
      modal_delete_text2: 'Todos los datos que dependen de este urna serán eliminados.',
      unique_error_internal_code: 'El código interno introducido ya está en uso para este nicho.',
      successfully_created: 'La urna ha sido creada correctamente.',
      successfully_edited: 'La urna ha sido editada correctamente.',
      successfully_deleted: 'La urna ha sido eliminada correctamente.',
      delete_error: 'La urna no ha sido encontrada.'
    },
    person: {
      entity: 'Persona',
      list_title: 'Personas',
      details_title: 'Detalles de la persona',
      add_person: 'Añadir persona',
      dni: 'DNI',
      dni_placeholder: 'DNI de la persona',
      first_name: 'Nombre',
      first_name_placeholder: 'Nombre de la persona',
      last_name1: 'Primer apellido',
      last_name1_placeholder: 'Primer apellido de la persona',
      last_name2: 'Segundo apellido',
      last_name2_placeholder: 'Segundo apellido de la persona',
      address: 'Domicilio',
      address_placeholder: 'Domicilio de la persona',
      state: 'Localidad',
      state_placeholder: 'Localidad de la persona',
      city: 'Provincia',
      city_placeholder: 'Provincia de la persona',
      email: 'Correo electrónico',
      email_placeholder: 'Correo electrónico de la persona',
      phone: 'Teléfono',
      phone_placeholder: 'Teléfono de la persona',
      postal_code: 'Código postal',
      postal_code_placeholder: 'Código postal de la persona',
      marital_status: 'Estado civil',
      marital_status_placeholder: 'Estado civil de la persona',
      birthdate: 'Fecha de nacimiento',
      birthdate_placeholder: 'Fecha de nacimiento',
      deathdate: 'Fecha de fallecimiento',
      deathdate_placeholder: 'Fecha de fallecimiento',
      in_casket_detail: 'Cofre al que pertenece',
      in_casket: 'En cofre',
      full_name: 'Nombre completo',
      deposit: 'Depósitos realizados',
      single: 'Soltero/a',
      married: 'Casado/a',
      union: 'Unión libre o de hecho',
      separate: 'Separado/a',
      divorced: 'Divorciado/a',
      widower: 'Viudo/a',
      no_data: 'No se han encontrado personas.',
      modal_create_title: 'Añadir persona',
      modal_edit_title: 'Editar persona',
      modal_delete_title: 'Eliminar persona',
      modal_delete_text1: '¿Está seguro que quiere eliminar la persona',
      modal_delete_text2: 'Todos los datos asociados a esta persona serán eliminados.',
      unique_error_dni: 'El DNI introducido ya está en uso.',
      successfully_created: 'La persona ha sido creada correctamente.',
      successfully_edited: 'La persona ha sido editada correctamente.',
      successfully_deleted: 'La persona ha sido eliminada correctamente.',
      delete_error: 'La persona no ha sido encontrada.',
      person_reservation: 'Reservas de la persona'
    },
    casket: {
      entity: 'Cofre',
      list_title: 'Cofres',
      details_title: 'Detalles del cofre',
      add_casket: 'Añadir cofre',
      people_in_casket: 'Persona/s contenida/s en el cofre',
      person_in_casket: 'Persona contenida en el cofre',
      people: 'Persona/s',
      description: 'Descripción del cofre',
      description_placeholder: 'Descripción sobre el cofre',
      people_in_casket_number: 'Número de personas contenidas en el cofre',
      deposit: 'Depósitos realizados del cofre',
      no_data: 'No se han encontrado cofres.',
      modal_create_title: 'Añadir cofre',
      modal_edit_title: 'Editar cofre',
      modal_delete_title: 'Eliminar cofre',
      modal_delete_text1: '¿Está seguro que quiere eliminar el cofre',
      modal_delete_text2: 'Todos los datos que dependen de este cofre serán eliminados a excepción de las personas que pasarán a estar sin cofre.',
      unique_error_internal_code: 'El código interno introducido ya está en uso.',
      unique_error_name: 'El nombre del cofre introducido ya está en uso.',
      successfully_created: 'El cofre ha sido creado correctamente.',
      successfully_edited: 'El cofre ha sido editado correctamente.',
      successfully_deleted: 'El cofre ha sido eliminado correctamente.',
      delete_error: 'El cofre no ha sido encontrado.'
    },
    common: {
      select_person: 'Seleccionar una persona del sistema',
      add_person: 'Añadir una persona al sistema',
      person_in_casket: 'Persona contenida en el cofre'
    },
    user: {
      entity: 'Usuario',
      list_title: 'Usuarios',
      details_title: 'Detalles del usuario',
      add_user: 'Añadir usuario',
      id: 'Identificador',
      name: 'Nombre',
      rol: 'Rol',
      person_id: 'Persona',
      password: 'Contraseña',
      password_placeholder: 'Contraseña del usuario',
      new_password: 'Nueva contraseña',
      new_password_placeholder: 'Nueva contraseña del usuario',
      no_data: 'No se han encontrado usuarios.',
      modal_create_title: 'Añadir usuario',
      modal_edit_title: 'Editar usuario',
      modal_delete_title: 'Eliminar usuario',
      modal_delete_text1: '¿Está seguro que quiere este el usuario',
      unique_error_internal_code: 'El código interno introducido ya está en uso.',
      unique_error_name: 'El nombre del usuario introducido ya está en uso.',
      successfully_created: 'El usuario ha sido creado correctamente.',
      successfully_edited: 'El usuario ha sido editado correctamente.',
      successfully_deleted: 'El usuario ha sido eliminado correctamente.',
      delete_error: 'El usuario no ha sido encontrado.'
    },
    reservation: {
      entity: 'Reserva',
      list_title: 'Reservas',
      details_title: 'Detalles de la reserva',
      add_reservation: 'Añadir reserva',
      start_date: 'Fecha de inicio',
      end_date: 'Fecha de fin',
      start_date_placeholder: 'Fecha inicial de la reserva',
      reservation_time: 'Número de años de reserva',
      reservation_time_placeholder: 'Número de años de reserva',
      more_reservation_time: 'Número de años de ampliación de reserva',
      more_reservation_time_placeholder: 'Número de años de ampliación de reserva',
      date_info_text_1: 'La reserva será realizada desde',
      date_info_text_2: 'hasta',
      reservation_time_validation: 'Introduzca un número mayor que 0',
      description: 'Descripción',
      description_placeholder: 'Descripción sobre la reserva',
      urn: 'Urna',
      deposit: 'Depósito de la reserva',
      reservation_urn: 'Urna asociada a la reserva',
      person: 'Solicitante',
      reservation_person: 'Persona que solcita la reserva',
      resume_reservation_title: 'Resumen de la reserva',
      resume_period_time: 'Periodo de reserva',
      resume_years: 'años',
      resume_niche_selected: 'Urna seleccionada',
      resume_person_selected: 'Persona que solicita la reserva',
      no_data: 'No se han encontrado reservas.',
      modal_create_title: 'Añadir reserva',
      modal_edit_title: 'Editar reserva',
      modal_delete_title: 'Eliminar reserva',
      modal_delete_text1: '¿Está seguro que quiere eliminar la reserva',
      modal_delete_text2: 'Todos los datos que dependen de esta reserva serán eliminados.',
      successfully_created: 'La reserva ha sido creada correctamente.',
      successfully_edited: 'La reserva ha sido editada correctamente.',
      successfully_deleted: 'La reserva ha sido eliminada correctamente.',
      delete_error: 'La reserva no ha sido encontrada.'
    },
    deposit: {
      entity: 'Depósito',
      list_title: 'Depósitos',
      details_title: 'Detalles del depósito',
      add_deposit: 'Añadir depósito',
      start_date: 'Fecha de inicio',
      end_date: 'Fecha de fin',
      start_date_placeholder: 'Fecha inicial de el depósito',
      date_info_text_1: 'El depósito será realizada desde',
      date_info_text_2: 'hasta',
      description: 'Descripción',
      description_placeholder: 'Descripción sobre el depósito',
      deceased_relationship: 'Relación con el difunto',
      deceased_relationship_placeholder: 'Relación del depositante con el difunto',
      reservation_id: 'Reserva para realizar depósito',
      casket_id: 'Cofre a depositar',
      deposit_person: 'Persona depositante',
      casket: 'Cofre',
      casket_deposited: 'Cofre depositado',
      reservation: 'Reserva',
      reservation_associated: 'Reserva asociada',
      resume_date: 'Fecha del depósito',
      resume_end_date: 'Fecha de retirada',
      resume_deposit_title: 'Resumen del depósito',
      no_data: 'No se han encontrado depósitos.',
      modal_create_title: 'Añadir depósito',
      modal_edit_title: 'Editar depósito',
      modal_delete_title: 'Eliminar depósito',
      modal_delete_text1: '¿Está seguro que quiere eliminar el depósito',
      modal_delete_text2: 'La reserva asociada a este depósito no se verá afectada.',
      successfully_created: 'El depósito ha sido creada correctamente.',
      successfully_edited: 'El depósito ha sido editada correctamente.',
      successfully_deleted: 'El depósito ha sido eliminada correctamente.',
      delete_error: 'El depósito no ha sido encontrada.'
    },
    relocation: {
      entity: 'Reubicación',
      list_title: 'Reubicaciones',
      details_title: 'Detalles del depósito',
      add_deposit: 'Añadir depósito',
      start_date: 'Fecha de inicio',
      end_date: 'Fecha de fin',
      start_date_placeholder: 'Fecha inicial de el depósito',
      date_info_text_1: 'El depósito será realizada desde',
      date_info_text_2: 'hasta',
      description: 'Descripción',
      description_placeholder: 'Descripción sobre el depósito',
      deceased_relationship: 'Relación con el difunto',
      deceased_relationship_placeholder: 'Relación del depositante con el difunto',
      reservation_id: 'Reserva para realizar depósito',
      casket_id: 'Cofre a depositar',
      deposit_person: 'Persona depositante',
      casket: 'Cofre',
      casket_deposited: 'Cofre depositado',
      reservation: 'Reserva',
      reservation_associated: 'Reserva asociada',
      resume_date: 'Fecha del depósito',
      resume_end_date: 'Fecha de retirada',
      resume_deposit_title: 'Resumen del depósito',
      no_data: 'No se han encontrado depósitos.',
      modal_create_title: 'Añadir depósito',
      modal_edit_title: 'Editar depósito',
      modal_delete_title: 'Eliminar depósito',
      modal_delete_text1: '¿Está seguro que quiere eliminar el depósito',
      modal_delete_text2: 'La reserva asociada a este depósito no se verá afectada.',
      successfully_created: 'El depósito ha sido creada correctamente.',
      successfully_edited: 'El depósito ha sido editada correctamente.',
      successfully_deleted: 'El depósito ha sido eliminada correctamente.',
      delete_error: 'El depósito no ha sido encontrada.'
    },
    map: {
      title: 'Mapa de la cripta'
    },
    guide: {
      title: 'Guía de usuario'
    }
  }
}
