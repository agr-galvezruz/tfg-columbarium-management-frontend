// This is just an example,
// so you can safely delete all default props below

export default {
  routes: {
    dashboard: 'Dashboard',
    crypt: 'Cripta',
    buildings: 'Edificios',
    rooms: 'Salas'
  },
  general_texts: {
    edit: 'Editar',
    delete: 'Eliminar',
    loading: 'Cargando...',
    no_data: 'No se han encontrado registros.',
    pagination_records: 'Registros',
    pagination_of: 'de',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    save: 'Guardar'
  },
  database_messages: {
    incorrect_login_data: 'Correo electrónico o contraseña incorrectos',
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
    form_components: {
      data_required: 'Dato obligatorio',
      phone_format: 'Formato de teléfono incorrecto',
      postal_code_format: 'Código postal incorrecto',
      email_format: 'Correo electrónico incorrecto',
      no_data: 'Sin datos',
      check_form: 'Revisar los datos introducidos',
      timer_selector: 'Selector de hora',
      cant_zero: 'El importe debe de ser mayor que cero',
      no_selected: 'Seleccione una opción'
    },
    filter: {
      add_filter: 'Filtrar',
      filtering: 'Filtrando',
      search_filter: 'Buscar filtro',
      search: 'Buscar',
      cancel: 'Cancelar',
      back: 'Atrás'
    }
  },
  pages: {
    login: {
      email: 'Correo electrónico',
      email_placeholder: 'Introduzca su correo electrónico',
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
      rooms_building: 'Salas del edificio',
      add_room: 'Añadir sala',
      internal_code: 'Código interno',
      internal_code_placeholder: 'Código de la sala',
      location: 'Ubicación',
      location_placeholder: 'Ubicación de la sala',
      building_id: 'Edificio al que pertenece',
      building_id_placeholder: 'Seleccione el edificio al que pertenece la sala',
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
    person: {
      title: 'Personas',
      add_person: 'Añadir persona',
      dni: 'DNI',
      full_name: 'Nombre completo',
      firstName: 'Nombre',
      lastName1: 'Primer apellido',
      lastName2: 'Segundo apellido',
      address: 'Dirección',
      city: 'Localidad',
      state: 'Provincia',
      phone: 'Teléfono',
      in_casket: 'En cofre'
    }
  }
}
