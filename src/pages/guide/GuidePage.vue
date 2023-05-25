<template>
  <div class="full-container flex column no-wrap gap-10">
    <title-component :title="$t('pages.guide.title')" />

    <div class="guide-container">
      <!-- Buildings -->
      <div class="section-title">{{ $t('routes.crypt') }}</div>
      <q-list class="list-styled" bordered>
        <q-expansion-item class="rounded-top grey-header" group="crypt" icon="church" :label="$t('routes.buildings')" header-class="text-secondary">
          <q-card>
            <q-card-section class="flex column gap-10">
              <div>
                <div><b>Consulta de datos</b></div>
                Esta sección muestra, en formato de tabla, un listado de todos los edificios dados de alta en la aplicación.
                Cada fila de la tabla puede ser clicada y el programa nos llevará a una información más detallada del edificio seleccionado.
                Además, encima de la tabla, se encuentra un buscador dividido en dos partes:
                <div> <q-icon name="filter_list" color="secondary" size="20px" /> <span class="subsection-title">Filtrar (botón)</span>: realiza una búsqueda del valor introducido en la columna seleccionada.</div>
                <div> <q-icon name="search" color="secondary" size="20px" /> <span class="subsection-title">Buscador (campo de texto)</span>: realiza una búsqueda del valor introducido en todas las columnas de la tabla.</div>
                Ambos filtros pueden ser combinados para buscar ciertos valores en columnas exactas (<q-icon name="filter_list" color="secondary" size="20px" /> <span class="subsection-title">botón filtrar</span>) y otros en las columnas restantes (<q-icon name="search" color="secondary" size="20px" /> <span class="subsection-title">campo de texto</span>).
              </div>
              <div v-if="isAdminUser">
                <div><b>Administración de edificios</b></div>
                Esta sección también ofrece la posibilidad de Crear, Editar y Eliminar edificios.
                <div> <q-icon name="add_circle_outline" color="secondary" size="20px" /> <span class="subsection-title">Añadir edificio</span>: Para añadir un edificio, tan solo hacer clic en su botón situado arriba a la derecha de la tabla. Después de esto aparecerá un formulario para la creación del edificio. Introducimos todos sus datos y pulsamos en <q-icon name="save" color="secondary" size="20px" /> <span class="subsection-title">Guardar</span> y, si todo ha ido bien, aparecerá el edificio añadido en la tabla junto a un mensaje de "Edificio guardado correctamente". En caso contrario, aparecerá un mensaje de aviso con el fallo que hubo.</div>
                <div> <q-icon name="drive_file_rename_outline" color="secondary" size="20px" /> <span class="subsection-title">Editar edificio</span>: Este botón parecerá al desplegar el menú <q-icon name="more_vert" color="secondary" size="20px" /> situado a la derecha de cada edificio listado. Al hacer click, desplegará un formulario relleno con todos sus datos. Podrán ser modificados esos datos y, una vez modificado el edificio, presionamos en <q-icon name="save" color="secondary" size="20px" /> <span class="subsection-title">Guardar</span>. Si todo ha ido bien, los cambios serán reflejados en la tabla junto a un mensaje de "Edificio modificado correctamente". En caso contrario, aparecerá un mensaje de aviso con el fallo que hubo.</div>
                <div> <q-icon name="delete" color="secondary" size="20px" /> <span class="subsection-title">Eliminar edificio</span>: Este botón parecerá al desplegar el menú <q-icon name="more_vert" color="secondary" size="20px" /> situado a la derecha de cada edificio listado. Al hacer click, desplegará un mensaje de advertencia informando que si procede a la elminación del edificio, todos los datos que dependen del mismo serán eliminados. En caso de proceder a eliminar, seleccionaremos el botón de <q-icon name="delete" color="secondary" size="20px" /> <span class="subsection-title">Elminar</span> y posteriormente los cambios serán reflejados en la tabla junto a un mensaje de "Edificio eliminado correctamente". En caso contrario, aparecerá un mensaje de aviso con el fallo que hubo.</div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator />

        <!-- Rooms -->
        <q-expansion-item class="grey-header" group="crypt" icon="view_module" :label="$t('routes.rooms')" header-class="text-secondary">
          <q-card>
            <q-card-section class="flex column gap-10">
              <div>
                <div><b>Consulta de datos</b></div>
                Esta sección muestra, en formato de tabla, un listado de todas las salas dadas de alta en la aplicación.
                Cada fila de la tabla puede ser clicada y el programa nos llevará a una información más detallada de la sala seleccionada.
                Además, encima de la tabla, se encuentra un buscador dividido en dos partes:
                <div> <q-icon name="filter_list" color="secondary" size="20px" /> <span class="subsection-title">Filtrar (botón)</span>: realiza una búsqueda del valor introducido en la columna seleccionada.</div>
                <div> <q-icon name="search" color="secondary" size="20px" /> <span class="subsection-title">Buscador (campo de texto)</span>: realiza una búsqueda del valor introducido en todas las columnas de la tabla.</div>
                Ambos filtros pueden ser combinados para buscar ciertos valores en columnas exactas (<q-icon name="filter_list" color="secondary" size="20px" /> <span class="subsection-title">botón filtrar</span>) y otros en las columnas restantes (<q-icon name="search" color="secondary" size="20px" /> <span class="subsection-title">campo de texto</span>).
              </div>
              <div v-if="isAdminUser">
                <div><b>Administración de salas</b></div>
                Esta sección también ofrece la posibilidad de Crear, Editar y Eliminar salas.
                <div> <q-icon name="add_circle_outline" color="secondary" size="20px" /> <span class="subsection-title">Añadir sala</span>: Para añadir una sala, tan solo hacer clic en su botón situado arriba a la derecha de la tabla. Después de esto aparecerá un formulario para la creación de la sala. Introducimos todos sus datos y pulsamos en <q-icon name="save" color="secondary" size="20px" /> <span class="subsection-title">Guardar</span> y, si todo ha ido bien, la sala aparecerá añadida en la tabla junto a un mensaje de "Sala guardada correctamente". En caso contrario, aparecerá un mensaje de aviso con el fallo que hubo.</div>
                <div> <q-icon name="drive_file_rename_outline" color="secondary" size="20px" /> <span class="subsection-title">Editar sala</span>: Este botón parecerá al desplegar el menú <q-icon name="more_vert" color="secondary" size="20px" /> situado a la derecha de cada sala listada. Al hacer click, desplegará un formulario relleno con todos sus datos. Podrán ser modificados esos datos y, una vez modificada la sala, presionamos en <q-icon name="save" color="secondary" size="20px" /> <span class="subsection-title">Guardar</span>. Si todo ha ido bien, los cambios serán reflejados en la tabla junto a un mensaje de "Sala modificada correctamente". En caso contrario, aparecerá un mensaje de aviso con el fallo que hubo.</div>
                <div> <q-icon name="delete" color="secondary" size="20px" /> <span class="subsection-title">Eliminar sala</span>: Este botón parecerá al desplegar el menú <q-icon name="more_vert" color="secondary" size="20px" /> situado a la derecha de cada sala listada. Al hacer click, desplegará un mensaje de advertencia informando que si procede a la elminación de la sala, todos los datos que dependen del mismo serán eliminados. En caso de proceder a eliminar, seleccionaremos el botón de <q-icon name="delete" color="secondary" size="20px" /> <span class="subsection-title">Elminar</span> y posteriormente los cambios serán reflejados en la tabla junto a un mensaje de "Sala eliminada correctamente". En caso contrario, aparecerá un mensaje de aviso con el fallo que hubo.</div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator />

        <!-- Rows -->
        <q-expansion-item class="grey-header" group="crypt" icon="reorder" :label="$t('routes.rows')" header-class="text-secondary">
          <q-card>
            <q-card-section class="flex column gap-10">
              <div>
                <div><b>Consulta de datos</b></div>
                Esta sección muestra, en formato de tabla, un listado de todas las filas dadas de alta en la aplicación.
                Cada fila de la tabla puede ser clicada y el programa nos llevará a una información más detallada de la fila seleccionada.
                Además, encima de la tabla, se encuentra un buscador dividido en dos partes:
                <div> <q-icon name="filter_list" color="secondary" size="20px" /> <span class="subsection-title">Filtrar (botón)</span>: realiza una búsqueda del valor introducido en la columna seleccionada.</div>
                <div> <q-icon name="search" color="secondary" size="20px" /> <span class="subsection-title">Buscador (campo de texto)</span>: realiza una búsqueda del valor introducido en todas las columnas de la tabla.</div>
                Ambos filtros pueden ser combinados para buscar ciertos valores en columnas exactas (<q-icon name="filter_list" color="secondary" size="20px" /> <span class="subsection-title">botón filtrar</span>) y otros en las columnas restantes (<q-icon name="search" color="secondary" size="20px" /> <span class="subsection-title">campo de texto</span>).
              </div>
              <div v-if="isAdminUser">
                <div><b>Administración de filas</b></div>
                Esta sección también ofrece la posibilidad de Crear, Editar y Eliminar filas.
                <div> <q-icon name="add_circle_outline" color="secondary" size="20px" /> <span class="subsection-title">Añadir fila</span>: Para añadir una fila, tan solo hacer clic en su botón situado arriba a la derecha de la tabla. Después de esto aparecerá un formulario para la creación de la fila. Introducimos todos sus datos y pulsamos en <q-icon name="save" color="secondary" size="20px" /> <span class="subsection-title">Guardar</span> y, si todo ha ido bien, la fila aparecerá añadida en la tabla junto a un mensaje de "Fila guardada correctamente". En caso contrario, aparecerá un mensaje de aviso con el fallo que hubo.</div>
                <div> <q-icon name="drive_file_rename_outline" color="secondary" size="20px" /> <span class="subsection-title">Editar fila</span>: Este botón parecerá al desplegar el menú <q-icon name="more_vert" color="secondary" size="20px" /> situado a la derecha de cada fila listada. Al hacer click, desplegará un formulario relleno con todos sus datos. Podrán ser modificados esos datos y, una vez modificada la fila, presionamos en <q-icon name="save" color="secondary" size="20px" /> <span class="subsection-title">Guardar</span>. Si todo ha ido bien, los cambios serán reflejados en la tabla junto a un mensaje de "Fila modificada correctamente". En caso contrario, aparecerá un mensaje de aviso con el fallo que hubo.</div>
                <div> <q-icon name="delete" color="secondary" size="20px" /> <span class="subsection-title">Eliminar fila</span>: Este botón parecerá al desplegar el menú <q-icon name="more_vert" color="secondary" size="20px" /> situado a la derecha de cada fila listada. Al hacer click, desplegará un mensaje de advertencia informando que si procede a la elminación de la fila, todos los datos que dependen del mismo serán eliminados. En caso de proceder a eliminar, seleccionaremos el botón de <q-icon name="delete" color="secondary" size="20px" /> <span class="subsection-title">Elminar</span> y posteriormente los cambios serán reflejados en la tabla junto a un mensaje de "Fila eliminada correctamente". En caso contrario, aparecerá un mensaje de aviso con el fallo que hubo.</div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator />

        <!-- Niches -->
        <q-expansion-item class="grey-header" group="crypt" icon="inventory" :label="$t('routes.niches')" header-class="text-secondary">
          <q-card>
            <q-card-section class="flex column gap-10">
              <div>
                <div><b>Consulta de datos</b></div>
                Esta sección muestra, en formato de tabla, un listado de todos los nichos dados de alta en la aplicación.
                Cada fila de la tabla puede ser clicada y el programa nos llevará a una información más detallada del nicho seleccionado.
                Además, encima de la tabla, se encuentra un buscador dividido en dos partes:
                <div> <q-icon name="filter_list" color="secondary" size="20px" /> <span class="subsection-title">Filtrar (botón)</span>: realiza una búsqueda del valor introducido en la columna seleccionada.</div>
                <div> <q-icon name="search" color="secondary" size="20px" /> <span class="subsection-title">Buscador (campo de texto)</span>: realiza una búsqueda del valor introducido en todas las columnas de la tabla.</div>
                Ambos filtros pueden ser combinados para buscar ciertos valores en columnas exactas (<q-icon name="filter_list" color="secondary" size="20px" /> <span class="subsection-title">botón filtrar</span>) y otros en las columnas restantes (<q-icon name="search" color="secondary" size="20px" /> <span class="subsection-title">campo de texto</span>).
              </div>
              <div v-if="isAdminUser">
                <div><b>Administración de nichos</b></div>
                Esta sección también ofrece la posibilidad de Crear, Editar y Eliminar nichos.
                <div> <q-icon name="add_circle_outline" color="secondary" size="20px" /> <span class="subsection-title">Añadir nicho</span>: Para añadir un nicho, tan solo hacer clic en su botón situado arriba a la derecha de la tabla. Después de esto aparecerá un formulario para la creación del nicho. Introducimos todos sus datos y pulsamos en <q-icon name="save" color="secondary" size="20px" /> <span class="subsection-title">Guardar</span>. Se crearán tantas urnas en este nicho como las especificadas en el campo de "Almacenamiento" y, si todo ha ido bien, el nicho aparecerá añadido en la tabla junto a un mensaje de "Nicho guardado correctamente". En caso contrario, aparecerá un mensaje de aviso con el fallo que hubo.</div>
                <div> <q-icon name="drive_file_rename_outline" color="secondary" size="20px" /> <span class="subsection-title">Editar nicho</span>: Este botón parecerá al desplegar el menú <q-icon name="more_vert" color="secondary" size="20px" /> situado a la derecha de cada nicho listado. Al hacer click, desplegará un formulario relleno con todos sus datos. Podrán ser modificados esos datos y, una vez modificado el nicho, presionamos en <q-icon name="save" color="secondary" size="20px" /> <span class="subsection-title">Guardar</span>. Si todo ha ido bien, los cambios serán reflejados en la tabla junto a un mensaje de "Nicho modificado correctamente". En caso contrario, aparecerá un mensaje de aviso con el fallo que hubo.</div>
                <div> <q-icon name="delete" color="secondary" size="20px" /> <span class="subsection-title">Eliminar nicho</span>: Este botón parecerá al desplegar el menú <q-icon name="more_vert" color="secondary" size="20px" /> situado a la derecha de cada nicho listado. Al hacer click, desplegará un mensaje de advertencia informando que si procede a la elminación del nicho, todos los datos que dependen del mismo serán eliminados. En caso de proceder a eliminar, seleccionaremos el botón de <q-icon name="delete" color="secondary" size="20px" /> <span class="subsection-title">Elminar</span> y posteriormente los cambios serán reflejados en la tabla junto a un mensaje de "Nicho eliminado correctamente". En caso contrario, aparecerá un mensaje de aviso con el fallo que hubo.</div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator />

        <!-- Urns -->
        <q-expansion-item class="grey-header" group="crypt" icon="grid_view" :label="$t('routes.urns')" header-class="text-secondary">
          <q-card>
            <q-card-section class="flex column gap-10">
              <div>
                <div><b>Consulta de datos</b></div>
                Esta sección muestra, en formato de tabla, un listado de todas las urnas dadas de alta en la aplicación.
                Cada fila de la tabla puede ser clicada y el programa nos llevará a una información más detallada de la urna seleccionada.
                Además, encima de la tabla, se encuentra un buscador dividido en dos partes:
                <div> <q-icon name="filter_list" color="secondary" size="20px" /> <span class="subsection-title">Filtrar (botón)</span>: realiza una búsqueda del valor introducido en la columna seleccionada.</div>
                <div> <q-icon name="search" color="secondary" size="20px" /> <span class="subsection-title">Buscador (campo de texto)</span>: realiza una búsqueda del valor introducido en todas las columnas de la tabla.</div>
                Ambos filtros pueden ser combinados para buscar ciertos valores en columnas exactas (<q-icon name="filter_list" color="secondary" size="20px" /> <span class="subsection-title">botón filtrar</span>) y otros en las columnas restantes (<q-icon name="search" color="secondary" size="20px" /> <span class="subsection-title">campo de texto</span>).
              </div>
              <div v-if="isAdminUser">
                <div><b>Administración de urnas</b></div>
                Esta sección también ofrece la posibilidad de Crear, Editar y Eliminar urnas.
                <div> <q-icon name="add_circle_outline" color="secondary" size="20px" /> <span class="subsection-title">Añadir urna</span>: Para añadir una urna, tan solo hacer clic en su botón situado arriba a la derecha de la tabla. Después de esto aparecerá un formulario para la creación de la urna. Introducimos todos sus datos y pulsamos en <q-icon name="save" color="secondary" size="20px" /> <span class="subsection-title">Guardar</span> y, si todo ha ido bien, la urna aparecerá añadida en la tabla junto a un mensaje de "Urna guardada correctamente". En caso contrario, aparecerá un mensaje de aviso con el fallo que hubo.</div>
                <div> <q-icon name="drive_file_rename_outline" color="secondary" size="20px" /> <span class="subsection-title">Editar urna</span>: Este botón parecerá al desplegar el menú <q-icon name="more_vert" color="secondary" size="20px" /> situado a la derecha de cada urna listada. Al hacer click, desplegará un formulario relleno con todos sus datos. Podrán ser modificados esos datos y, una vez modificada la urna, presionamos en <q-icon name="save" color="secondary" size="20px" /> <span class="subsection-title">Guardar</span>. Si todo ha ido bien, los cambios serán reflejados en la tabla junto a un mensaje de "Urna modificada correctamente". En caso contrario, aparecerá un mensaje de aviso con el fallo que hubo.</div>
                <div> <q-icon name="delete" color="secondary" size="20px" /> <span class="subsection-title">Eliminar urna</span>: Este botón parecerá al desplegar el menú <q-icon name="more_vert" color="secondary" size="20px" /> situado a la derecha de cada urna listada. Al hacer click, desplegará un mensaje de advertencia informando que si procede a la elminación de la urna, todos los datos que dependen del mismo serán eliminados. En caso de proceder a eliminar, seleccionaremos el botón de <q-icon name="delete" color="secondary" size="20px" /> <span class="subsection-title">Elminar</span> y posteriormente los cambios serán reflejados en la tabla junto a un mensaje de "Urna eliminada correctamente". En caso contrario, aparecerá un mensaje de aviso con el fallo que hubo.</div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator />

        <!-- Map -->
        <q-expansion-item class="rounded-bot grey-header" group="crypt" icon="map" :label="$t('routes.map')" header-class="text-secondary">
          <q-card class="rounded-bot">
            <q-card-section class="flex column gap-10">
              <div>
                <div><b>Consulta de datos</b></div>
                En el mapa de la cripta se muestra una representación visual de las filas y nichos del columbario, donde se utilizan diferentes estados para reflejar su disponibilidad. Los estados disponibles son:
                <div class="flex column gap-5 q-my-sm">
                  <div class="leyend-content">
                    <div class="color-square green-niche"></div>
                    <div><span style="font-weight:500">Disponible</span>: utilizado cuando al menos una urna dentro del nicho está disponible, sin tener en cuenta las urnas deshabilitadas.</div>
                  </div>
                  <div class="leyend-content">
                    <div class="color-square yellow-niche"></div>
                    <div><span style="font-weight:500">Reservado</span>: utilizado cuando todas las urnas dentro del nicho están reservadas y no quedan urnas disponibles, sin tener en cuenta las urnas deshabilitadas.</div>
                  </div>
                  <div class="leyend-content">
                    <div class="color-square purple-niche"></div>
                    <div><span style="font-weight:500">Caducado</span>: utilizado cuando al menos una urna dentro del nicho ha caducado y no quedan urnas disponibles, sin tener en cuenta las urnas deshabilitadas.</div>
                  </div>
                  <div class="leyend-content">
                    <div class="color-square red-niche"></div>
                    <div><span style="font-weight:500">Ocupado</span>: utilizado cuando todas las urnas dentro del nicho están ocupadas, sin tener en cuenta las urnas deshabilitadas.</div>
                  </div>
                  <div class="leyend-content">
                    <div class="color-square black-niche"></div>
                    <div><span style="font-weight:500">Deshabilitado</span>: utilizado cuando todas las urnas dentro del nicho están deshabilitadas por algún motivo.</div>
                  </div>
                </div>
                Cada casilla, que representa un nicho en una fila específica, es interactiva y se puede hacer clic en ella. Al hacerlo, se despliega una vista detallada del nicho seleccionado.
                En esta vista completa del nicho, se muestra una representación visual de las urnas presentes en el nicho y, que a su vez, se puede hacer clic en cada urna para visualizar el historial de esa urna.
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>


      <div class="section-title">{{ $t('routes.record') }}</div>
      <q-list class="list-styled" bordered>
        <!-- Caskets -->
        <q-expansion-item class="rounded-top grey-header" group="crypt" icon="takeout_dining" :label="$t('routes.caskets')" header-class="text-secondary">
          <q-card>
            <q-card-section class="flex column gap-10">
              <div>
                <div><b>Consulta de datos</b></div>
                Esta sección muestra, en formato de tabla, un listado de todos los cofres dados de alta en la aplicación.
                Cada fila de la tabla puede ser clicada y el programa nos llevará a una información más detallada del cofre seleccionado.
                Además, encima de la tabla, se encuentra un buscador dividido en dos partes:
                <div> <q-icon name="filter_list" color="secondary" size="20px" /> <span class="subsection-title">Filtrar (botón)</span>: realiza una búsqueda del valor introducido en la columna seleccionada.</div>
                <div> <q-icon name="search" color="secondary" size="20px" /> <span class="subsection-title">Buscador (campo de texto)</span>: realiza una búsqueda del valor introducido en todas las columnas de la tabla.</div>
                Ambos filtros pueden ser combinados para buscar ciertos valores en columnas exactas (<q-icon name="filter_list" color="secondary" size="20px" /> <span class="subsection-title">botón filtrar</span>) y otros en las columnas restantes (<q-icon name="search" color="secondary" size="20px" /> <span class="subsection-title">campo de texto</span>).
              </div>
              <div v-if="isAdminUser">
                <div><b>Administración de cofres</b></div>
                Esta sección también ofrece la posibilidad de Crear, Editar y Eliminar cofres.
                <div> <q-icon name="add_circle_outline" color="secondary" size="20px" /> <span class="subsection-title">Añadir cofre</span>: Para añadir un cofre, tan solo hacer clic en su botón situado arriba a la derecha de la tabla. Después de esto aparecerá un formulario para la creación del cofre dividido en dos pasos:
                <div class="q-pl-md">
                  <div><span style="font-weight:500">1. Primer paso</span>: selección de restos cinerarios pertenecientes. Se ofrece la opción a seleccionar una persona existente en el sistema o añadir una nueva al sistema.</div>
                  <div><span style="font-weight:500">2. Paso final</span>: resumen con los datos introducidos en el primer paso. Si hay más restos cinerarios por añadir, se brinda la opción de agregar una nueva persona y regresar al primer paso del formulario.</div>
                </div>
                Pulsamos en <q-icon name="save" color="secondary" size="20px" /> <span class="subsection-title">Guardar</span> y, si todo ha ido bien, el cofre aparecerá añadido en la tabla junto a un mensaje de "Cofre guardado correctamente". En caso contrario, aparecerá un mensaje de aviso con el fallo que hubo.</div>
                <div> <q-icon name="drive_file_rename_outline" color="secondary" size="20px" /> <span class="subsection-title">Editar cofre</span>: Este botón parecerá al desplegar el menú <q-icon name="more_vert" color="secondary" size="20px" /> situado a la derecha de cada cofre listado. Al hacer click, desplegará un formulario relleno con todos sus datos. Podrán ser modificados esos datos y, una vez modificado el cofre, presionamos en <q-icon name="save" color="secondary" size="20px" /> <span class="subsection-title">Guardar</span>. Si todo ha ido bien, los cambios serán reflejados en la tabla junto a un mensaje de "Cofre modificado correctamente". En caso contrario, aparecerá un mensaje de aviso con el fallo que hubo.</div>
                <div> <q-icon name="delete" color="secondary" size="20px" /> <span class="subsection-title">Eliminar cofre</span>: Este botón parecerá al desplegar el menú <q-icon name="more_vert" color="secondary" size="20px" /> situado a la derecha de cada cofre listado. Al hacer click, desplegará un mensaje de advertencia informando que si procede a la elminación del cofre, todos los datos que dependen del mismo serán eliminados. En caso de proceder a eliminar, seleccionaremos el botón de <q-icon name="delete" color="secondary" size="20px" /> <span class="subsection-title">Elminar</span> y posteriormente los cambios serán reflejados en la tabla junto a un mensaje de "Cofre eliminado correctamente". En caso contrario, aparecerá un mensaje de aviso con el fallo que hubo.</div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator />

        <!-- People -->
        <q-expansion-item class="rounded-bot grey-header" group="crypt" icon="people" :label="$t('routes.people')" header-class="text-secondary">
          <q-card class="rounded-bot">
            <q-card-section class="flex column gap-10">
              <div>
                <div><b>Consulta de datos</b></div>
                Esta sección muestra, en formato de tabla, un listado de todas las personas dadas de alta en la aplicación.
                Cada fila de la tabla puede ser clicada y el programa nos llevará a una información más detallada de la persona seleccionada.
                Además, encima de la tabla, se encuentra un buscador dividido en dos partes:
                <div> <q-icon name="filter_list" color="secondary" size="20px" /> <span class="subsection-title">Filtrar (botón)</span>: realiza una búsqueda del valor introducido en la columna seleccionada.</div>
                <div> <q-icon name="search" color="secondary" size="20px" /> <span class="subsection-title">Buscador (campo de texto)</span>: realiza una búsqueda del valor introducido en todas las columnas de la tabla.</div>
                Ambos filtros pueden ser combinados para buscar ciertos valores en columnas exactas (<q-icon name="filter_list" color="secondary" size="20px" /> <span class="subsection-title">botón filtrar</span>) y otros en las columnas restantes (<q-icon name="search" color="secondary" size="20px" /> <span class="subsection-title">campo de texto</span>).
              </div>
              <div v-if="isAdminUser">
                <div><b>Administración de personas</b></div>
                Esta sección también ofrece la posibilidad de Crear, Editar y Eliminar personas.
                <div> <q-icon name="add_circle_outline" color="secondary" size="20px" /> <span class="subsection-title">Añadir persona</span>: Para añadir una persona, tan solo hacer clic en su botón situado arriba a la derecha de la tabla. Después de esto aparecerá un formulario para la creación de la persona. Introducimos todos sus datos y pulsamos en <q-icon name="save" color="secondary" size="20px" /> <span class="subsection-title">Guardar</span> y, si todo ha ido bien, la persona aparecerá añadida en la tabla junto a un mensaje de "Persona guardada correctamente". En caso contrario, aparecerá un mensaje de aviso con el fallo que hubo.</div>
                <div> <q-icon name="drive_file_rename_outline" color="secondary" size="20px" /> <span class="subsection-title">Editar persona</span>: Este botón parecerá al desplegar el menú <q-icon name="more_vert" color="secondary" size="20px" /> situado a la derecha de cada persona listada. Al hacer click, desplegará un formulario relleno con todos sus datos. Podrán ser modificados esos datos y, una vez modificada la persona, presionamos en <q-icon name="save" color="secondary" size="20px" /> <span class="subsection-title">Guardar</span>. Si todo ha ido bien, los cambios serán reflejados en la tabla junto a un mensaje de "Persona modificada correctamente". En caso contrario, aparecerá un mensaje de aviso con el fallo que hubo.</div>
                <div> <q-icon name="delete" color="secondary" size="20px" /> <span class="subsection-title">Eliminar persona</span>: Este botón parecerá al desplegar el menú <q-icon name="more_vert" color="secondary" size="20px" /> situado a la derecha de cada persona listada. Al hacer click, desplegará un mensaje de advertencia informando que si procede a la elminación de la persona, todos los datos que dependen del mismo serán eliminados. En caso de proceder a eliminar, seleccionaremos el botón de <q-icon name="delete" color="secondary" size="20px" /> <span class="subsection-title">Elminar</span> y posteriormente los cambios serán reflejados en la tabla junto a un mensaje de "Persona eliminada correctamente". En caso contrario, aparecerá un mensaje de aviso con el fallo que hubo.</div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>


      <div class="section-title">{{ $t('routes.management') }}</div>
      <q-list class="list-styled" bordered>
        <!-- Reservations -->
        <q-expansion-item class="rounded-top grey-header" group="crypt" icon="auto_stories" :label="$t('routes.reservations')" header-class="text-secondary">
          <q-card>
            <q-card-section class="flex column gap-10">
              <div>
                <div><b>Consulta de datos</b></div>
                Esta sección muestra, en formato de tabla, un listado de todas las reservas dadas de alta en la aplicación.
                Cada fila de la tabla puede ser clicada y el programa nos llevará a una información más detallada de la reserva seleccionada.
                Además, encima de la tabla, se encuentra un buscador dividido en dos partes:
                <div> <q-icon name="filter_list" color="secondary" size="20px" /> <span class="subsection-title">Filtrar (botón)</span>: realiza una búsqueda del valor introducido en la columna seleccionada.</div>
                <div> <q-icon name="search" color="secondary" size="20px" /> <span class="subsection-title">Buscador (campo de texto)</span>: realiza una búsqueda del valor introducido en todas las columnas de la tabla.</div>
                Ambos filtros pueden ser combinados para buscar ciertos valores en columnas exactas (<q-icon name="filter_list" color="secondary" size="20px" /> <span class="subsection-title">botón filtrar</span>) y otros en las columnas restantes (<q-icon name="search" color="secondary" size="20px" /> <span class="subsection-title">campo de texto</span>).
              </div>
              <div v-if="isAdminUser">
                <div><b>Administración de reservas</b></div>
                Esta sección también ofrece la posibilidad de Crear, Editar y Eliminar reservas.
                <div> <q-icon name="add_circle_outline" color="secondary" size="20px" /> <span class="subsection-title">Añadir reserva</span>: Para añadir una reserva, tan solo hacer clic en su botón situado arriba a la derecha de la tabla. Después de esto aparecerá un formulario para la creación de la reserva dividido en cuatro pasos:
                <div class="q-pl-md">
                  <div><span style="font-weight:500">1. Primer paso</span>: selección del tipo de fecha inicio/fin (automática dependiendo de los años introducidos o manual).</div>
                  <div><span style="font-weight:500">2. Segundo paso</span>: selección de una urna disponible para ser reservada.</div>
                  <div><span style="font-weight:500">3. Tercer paso</span>: selección de titular/persona que solicita la reserva. Se ofrece la opción a seleccionar una persona existente en el sistema o añadir una nueva al sistema.</div>
                  <div><span style="font-weight:500">4. Paso final</span>: resumen con los datos introducidos en los pasos anteriores.</div>
                </div>
                Pulsamos en <q-icon name="save" color="secondary" size="20px" /> <span class="subsection-title">Guardar</span> y, si todo ha ido bien, la reserva aparecerá añadida en la tabla junto a un mensaje de "Reserva guardada correctamente". En caso contrario, aparecerá un mensaje de aviso con el fallo que hubo.</div>
                <div> <q-icon name="drive_file_rename_outline" color="secondary" size="20px" /> <span class="subsection-title">Editar reserva</span>: Este botón parecerá al desplegar el menú <q-icon name="more_vert" color="secondary" size="20px" /> situado a la derecha de cada reserva listada. Al hacer click, desplegará un formulario relleno con todos sus datos y se podrán presentar dos situaciones:
                <div class="q-pl-md">
                  <div><span style="font-weight:500">1. La reserva no ha recibido un depósito</span>: se pueden modificar cualquier dato de la reserva. En el caso de modificar la urna reservada, se añadirá una nueva línea al campo de "Anotaciones" notificando de ese cambio.</div>
                  <div><span style="font-weight:500">2. La reserva ya ha recibido un depósito</span>: se pueden modificar sólo los datos del titular/solicitante de la reserva.</div>
                </div>
                Podrán ser modificados esos datos y, una vez modificada la reserva, presionamos en <q-icon name="save" color="secondary" size="20px" /> <span class="subsection-title">Guardar</span>. Si todo ha ido bien, los cambios serán reflejados en la tabla junto a un mensaje de "Reserva modificada correctamente". En caso contrario, aparecerá un mensaje de aviso con el fallo que hubo.</div>
                <div> <q-icon name="delete" color="secondary" size="20px" /> <span class="subsection-title">Eliminar reserva</span>: Este botón parecerá al desplegar el menú <q-icon name="more_vert" color="secondary" size="20px" /> situado a la derecha de cada reserva listada. Al hacer click, desplegará un mensaje de advertencia informando que si procede a la elminación de la reserva, todos los datos que dependen del mismo serán eliminados. En caso de proceder a eliminar, seleccionaremos el botón de <q-icon name="delete" color="secondary" size="20px" /> <span class="subsection-title">Elminar</span> y posteriormente los cambios serán reflejados en la tabla junto a un mensaje de "Reserva eliminada correctamente". En caso contrario, aparecerá un mensaje de aviso con el fallo que hubo.</div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator />

        <q-expansion-item class="grey-header" group="crypt" icon="archive" :label="$t('routes.deposits')" header-class="text-secondary">
          <q-card>
            <!-- Deposits -->
            <q-card-section class="flex column gap-10">
              <div>
                <div><b>Consulta de datos</b></div>
                Esta sección muestra, en formato de tabla, un listado de todos los depósitos dados de alta en la aplicación.
                Cada fila de la tabla puede ser clicada y el programa nos llevará a una información más detallada del depósito seleccionado.
                Además, encima de la tabla, se encuentra un buscador dividido en dos partes:
                <div> <q-icon name="filter_list" color="secondary" size="20px" /> <span class="subsection-title">Filtrar (botón)</span>: realiza una búsqueda del valor introducido en la columna seleccionada.</div>
                <div> <q-icon name="search" color="secondary" size="20px" /> <span class="subsection-title">Buscador (campo de texto)</span>: realiza una búsqueda del valor introducido en todas las columnas de la tabla.</div>
                Ambos filtros pueden ser combinados para buscar ciertos valores en columnas exactas (<q-icon name="filter_list" color="secondary" size="20px" /> <span class="subsection-title">botón filtrar</span>) y otros en las columnas restantes (<q-icon name="search" color="secondary" size="20px" /> <span class="subsection-title">campo de texto</span>).
              </div>
              <div v-if="isAdminUser">
                <div><b>Administración de depósitos</b></div>
                Esta sección también ofrece la posibilidad de Crear, Editar y Eliminar depósitos.
                <div> <q-icon name="add_circle_outline" color="secondary" size="20px" /> <span class="subsection-title">Añadir depósito</span>: Para añadir un depósito, tan solo hacer clic en su botón situado arriba a la derecha de la tabla. Después de esto aparecerá un formulario para la creación del depósito dividido en cuatro pasos:
                <div class="q-pl-md">
                  <div><span style="font-weight:500">1. Primer paso</span>: selección del tipo de fecha del depósito (automática a día de hoy o manual).</div>
                  <div><span style="font-weight:500">2. Segundo paso</span>: selección de una reserva disponible que aun no ha recibido el depósito y selección del cofre a depositar.</div>
                  <div><span style="font-weight:500">3. Tercer paso</span>: selección de la persona que realiza el depósito. Se ofrece la opción a seleccionar una persona existente en el sistema o añadir una nueva al sistema.</div>
                  <div><span style="font-weight:500">4. Paso final</span>: resumen con los datos introducidos en los pasos anteriores.</div>
                </div>
                Pulsamos en <q-icon name="save" color="secondary" size="20px" /> <span class="subsection-title">Guardar</span> y, si todo ha ido bien, el depósito aparecerá añadido en la tabla junto a un mensaje de "Depósito guardado correctamente". En caso contrario, aparecerá un mensaje de aviso con el fallo que hubo.</div>
                <div> <q-icon name="drive_file_rename_outline" color="secondary" size="20px" /> <span class="subsection-title">Editar depósito</span>: Este botón parecerá al desplegar el menú <q-icon name="more_vert" color="secondary" size="20px" /> situado a la derecha de cada depósito listado. Al hacer click, desplegará un formulario relleno con todos sus datos. Podrán ser modificados esos datos y, una vez modificado el depósito, presionamos en <q-icon name="save" color="secondary" size="20px" /> <span class="subsection-title">Guardar</span>. Si todo ha ido bien, los cambios serán reflejados en la tabla junto a un mensaje de "Depósito modificado correctamente". En caso contrario, aparecerá un mensaje de aviso con el fallo que hubo.</div>
                <div> <q-icon name="delete" color="secondary" size="20px" /> <span class="subsection-title">Eliminar depósito</span>: Este botón parecerá al desplegar el menú <q-icon name="more_vert" color="secondary" size="20px" /> situado a la derecha de cada depósito listado. Al hacer click, desplegará un mensaje de advertencia informando que si procede a la elminación del depósito, todos los datos que dependen del mismo serán eliminados. En caso de proceder a eliminar, seleccionaremos el botón de <q-icon name="delete" color="secondary" size="20px" /> <span class="subsection-title">Elminar</span> y posteriormente los cambios serán reflejados en la tabla junto a un mensaje de "Depósito eliminado correctamente". En caso contrario, aparecerá un mensaje de aviso con el fallo que hubo.</div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator />

        <q-expansion-item class="rounded-bot grey-header" group="crypt" icon="swap_horiz" :label="$t('routes.relocations')" header-class="text-secondary">
          <!-- Relocations -->
          <q-card class="rounded-bot">
            <q-card-section class="flex column gap-10">
              <div>
                <div><b>Consulta de datos</b></div>
                Esta sección muestra, en formato de tabla, un listado de todas las reubicaciones dadas de alta en la aplicación.
                Cada fila de la tabla puede ser clicada y el programa nos llevará a una información más detallada de la reubicación seleccionada.
                Además, encima de la tabla, se encuentra un buscador dividido en dos partes:
                <div> <q-icon name="filter_list" color="secondary" size="20px" /> <span class="subsection-title">Filtrar (botón)</span>: realiza una búsqueda del valor introducido en la columna seleccionada.</div>
                <div> <q-icon name="search" color="secondary" size="20px" /> <span class="subsection-title">Buscador (campo de texto)</span>: realiza una búsqueda del valor introducido en todas las columnas de la tabla.</div>
                Ambos filtros pueden ser combinados para buscar ciertos valores en columnas exactas (<q-icon name="filter_list" color="secondary" size="20px" /> <span class="subsection-title">botón filtrar</span>) y otros en las columnas restantes (<q-icon name="search" color="secondary" size="20px" /> <span class="subsection-title">campo de texto</span>).
              </div>
              <div v-if="isAdminUser">
                <div><b>Administración de reubicaciones</b></div>
                Esta sección también ofrece la posibilidad de Crear, Editar y Eliminar reubicaciones.
                <div> <q-icon name="add_circle_outline" color="secondary" size="20px" /> <span class="subsection-title">Añadir reubicación</span>: Para añadir una reubicación, tan solo hacer clic en su botón situado arriba a la derecha de la tabla. Después de esto aparecerá un formulario para la creación de la reubicación dividido en cinco pasos:
                <div class="q-pl-md">
                  <div><span style="font-weight:500">1. Primer paso</span>: selección del tipo de reubicación a realizar (cofre con reserva activa o  cofre que ya no cuenta con reserva).</div>
                  <div><span style="font-weight:500">2. Segundo paso</span>: selección del tipo de fecha que se realiza la reubicación (automática al día actual o manual).</div>
                  <div><span style="font-weight:500">3. Tercer paso</span>: dependiendo de la selección del primer paso se presentan dos opciones:</div>
                  <div class="q-pl-md">
                    <div><span style="font-weight:500">1. Reubicación con reserva asociada</span>: se solicitará seleccionar la reserva a reubicar.</div>
                    <div><span style="font-weight:500">2. Reubicación sin reserva</span>: se solicita seleccionar el cofre a reubicar.</div>
                  </div>
                  <div><span style="font-weight:500">4. Cuarto paso</span>: selección de una urna disponible para ser reubicado.</div>
                  <div><span style="font-weight:500">5. Paso final</span>: dependiendo de la selección del primer paso se presentan dos opciones:</div>
                  <div class="q-pl-md">
                    <div><span style="font-weight:500">1. Reubicación con reserva asociada</span>: se muestra el resumen con la reserva seleccionada. En este caso, se cerrará la reserva seleccionada y se abrirá una nueva con la misma fecha fin en la nueva urna. Se tratará como una nueva reserva.</div>
                    <div><span style="font-weight:500">2. Reubicación sin reserva</span>: se muestra el resumen con el cofre seleccionado. En este caso se realizará la reubicación y será reflejado en la tabla.</div>
                  </div>
                </div>
                Pulsamos en <q-icon name="save" color="secondary" size="20px" /> <span class="subsection-title">Guardar</span> y, si todo ha ido bien, la reubicación aparecerá añadida en la tabla junto a un mensaje de "Reubicación guardada correctamente". En caso contrario, aparecerá un mensaje de aviso con el fallo que hubo.</div>
                <div> <q-icon name="drive_file_rename_outline" color="secondary" size="20px" /> <span class="subsection-title">Editar reubicación</span>: Este botón parecerá al desplegar el menú <q-icon name="more_vert" color="secondary" size="20px" /> situado a la derecha de cada reubicación listada. Al hacer click, desplegará un formulario relleno con todos sus datos y podrán ser modificados esos datos y, una vez modificada la reubicación, presionamos en <q-icon name="save" color="secondary" size="20px" /> <span class="subsection-title">Guardar</span>. Si todo ha ido bien, los cambios serán reflejados en la tabla junto a un mensaje de "Reubicación modificada correctamente". En caso contrario, aparecerá un mensaje de aviso con el fallo que hubo.</div>
                <div> <q-icon name="delete" color="secondary" size="20px" /> <span class="subsection-title">Eliminar reubicación</span>: Este botón parecerá al desplegar el menú <q-icon name="more_vert" color="secondary" size="20px" /> situado a la derecha de cada reubicación listada. Al hacer click, desplegará un mensaje de advertencia informando que si procede a la elminación de la reubicación, todos los datos que dependen del mismo serán eliminados. En caso de proceder a eliminar, seleccionaremos el botón de <q-icon name="delete" color="secondary" size="20px" /> <span class="subsection-title">Elminar</span> y posteriormente los cambios serán reflejados en la tabla junto a un mensaje de "Reubicación eliminada correctamente". En caso contrario, aparecerá un mensaje de aviso con el fallo que hubo.</div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>

      <div class="section-title">{{ $t('routes.configuration') }}</div>
      <q-list class="list-styled" bordered>
        <!-- Users -->
        <q-expansion-item class="rounded-top rounded-bot grey-header" group="crypt" icon="manage_accounts" :label="$t('routes.users')" header-class="text-secondary">
          <q-card class="rounded-bot">
            <q-card-section class="flex column gap-10">
              <div>
                <div><b>Consulta de datos</b></div>
                Esta sección muestra, en formato de tabla, un listado de todos los usuarios dados de alta en la aplicación.
                Cada fila de la tabla puede ser clicada y el programa nos llevará a una información más detallada del usuario seleccionado.
                Además, encima de la tabla, se encuentra un buscador dividido en dos partes:
                <div> <q-icon name="filter_list" color="secondary" size="20px" /> <span class="subsection-title">Filtrar (botón)</span>: realiza una búsqueda del valor introducido en la columna seleccionada.</div>
                <div> <q-icon name="search" color="secondary" size="20px" /> <span class="subsection-title">Buscador (campo de texto)</span>: realiza una búsqueda del valor introducido en todas las columnas de la tabla.</div>
                Ambos filtros pueden ser combinados para buscar ciertos valores en columnas exactas (<q-icon name="filter_list" color="secondary" size="20px" /> <span class="subsection-title">botón filtrar</span>) y otros en las columnas restantes (<q-icon name="search" color="secondary" size="20px" /> <span class="subsection-title">campo de texto</span>).
              </div>
              <div v-if="isAdminUser">
                <div><b>Administración de usuarios</b></div>
                Esta sección también ofrece la posibilidad de Crear, Editar y Eliminar usuarios.
                <div> <q-icon name="add_circle_outline" color="secondary" size="20px" /> <span class="subsection-title">Añadir usuario</span>: Para añadir un usuario, tan solo hacer clic en su botón situado arriba a la derecha de la tabla. Después de esto aparecerá un formulario para la creación del usuario. Introducimos todos sus datos y pulsamos en <q-icon name="save" color="secondary" size="20px" /> <span class="subsection-title">Guardar</span>. Se crearán tantas urnas en este usuario como las especificadas en el campo de "Almacenamiento" y, si todo ha ido bien, el usuario aparecerá añadido en la tabla junto a un mensaje de "Usuario guardado correctamente". En caso contrario, aparecerá un mensaje de aviso con el fallo que hubo.</div>
                <div> <q-icon name="drive_file_rename_outline" color="secondary" size="20px" /> <span class="subsection-title">Editar usuario</span>: Este botón parecerá al desplegar el menú <q-icon name="more_vert" color="secondary" size="20px" /> situado a la derecha de cada usuario listado. Al hacer click, desplegará un formulario relleno con todos sus datos. Podrán ser modificados esos datos y, una vez modificado el usuario, presionamos en <q-icon name="save" color="secondary" size="20px" /> <span class="subsection-title">Guardar</span>. Si todo ha ido bien, los cambios serán reflejados en la tabla junto a un mensaje de "Usuario modificado correctamente". En caso contrario, aparecerá un mensaje de aviso con el fallo que hubo.</div>
                <div> <q-icon name="delete" color="secondary" size="20px" /> <span class="subsection-title">Eliminar usuario</span>: Este botón parecerá al desplegar el menú <q-icon name="more_vert" color="secondary" size="20px" /> situado a la derecha de cada usuario listado. Al hacer click, desplegará un mensaje de advertencia informando que si procede a la elminación del usuario, todos los datos que dependen del mismo serán eliminados. En caso de proceder a eliminar, seleccionaremos el botón de <q-icon name="delete" color="secondary" size="20px" /> <span class="subsection-title">Elminar</span> y posteriormente los cambios serán reflejados en la tabla junto a un mensaje de "Usuario eliminado correctamente". En caso contrario, aparecerá un mensaje de aviso con el fallo que hubo.</div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import TitleComponent from 'src/components/title/title-component'
import { useAuthenticationStore } from 'stores/authentication'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  components: {
    TitleComponent,
  },
  setup() {
    const authenticationStore = useAuthenticationStore()

    const isAdminUser = computed(() => authenticationStore.isAdmin)

    return {
      isAdminUser
    }
  }
})
</script>

<style lang="scss" scoped>
  .guide-container {
    border-radius: 12px !important;
    padding: 15px;
    box-shadow: var(--main-shadow);
    background-color: var(--background-color);
    display: flex;
    flex-direction: column;
    gap: 10px;

    .section-title {
      color: var(--main-text-color);
      font-size: 18px;
      font-weight: 600;
    }

    .list-styled {
      border-radius: 12px !important;
      font-size: 15px;
      line-height: 26px;
      // border: 1px solid var(--body-color);

      .subsection-title {
        font-weight: 500;
      }

      .grey-header {
        background-color: #f0f0f0;
      }

      .rounded-top {
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
      }

      .rounded-bot {
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
      }
    }

    .leyend-content {
      display: flex;
      align-items: center;
      gap: 5px;
      line-height: 20px;
      .color-square {
        border: 1px solid var(--main-text-color);
        border-radius: 6px;
        min-width: 20px;
        min-height: 20px;
        &.green-niche {
          background-color: #91d79d;
        }
        &.yellow-niche {
          background-color: #fbdea2;
        }
        &.red-niche {
          background-color: #fba6a1;
        }
        &.purple-niche {
          background-color: #e6a1fb;
        }
        &.black-niche {
          background-color: #575e68;
          color: var(--background-color);
        }
      }
      .leyend-text {
        color: var(--main-text-color);
        font-size: 15px;
        line-height: 26px;
      }
    }
  }
</style>