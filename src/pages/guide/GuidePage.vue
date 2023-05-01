<template>
  <div class="full-container flex column no-wrap gap-10">
    <title-component :title="$t('pages.guide.title')" />

    <div class="guide-container">
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
              <div>
                <div><b>Administración de edificios</b></div>
                Esta sección también ofrece la posibilidad de Crear, Editar y Eliminar edificios.
                <div> <q-icon name="add_circle_outline" color="secondary" size="20px" /> <span class="subsection-title">Añadir edificio</span>: Para añadir un edicio, tan solo hacer clic en su botón situado arriba a la derecha de la tabla. Después de esto aparecerá un formulario para la creación del edificio. Introducimos todos sus datos y pulsamos en <q-icon name="save" color="secondary" size="20px" /> <span class="subsection-title">Guardar</span> y, si todo ha ido bien, aparecerá el edificio añadido en la tabla junto a un mensaje de "Edificio guardado correctamente". En caso contrario, aparecerá un mensaje de aviso con el fallo que hubo.</div>
                <div> <q-icon name="drive_file_rename_outline" color="secondary" size="20px" /> <span class="subsection-title">Editar edificio</span>: Este botón parecerá al desplegar el menú <q-icon name="more_vert" color="secondary" size="20px" /> situado a la derecha de cada edificio listado. Al hacer click, desplegará un formulario relleno con todos sus datos. Podrán ser modificados esos datos y, una vez modificado el edificio, presionamos en <q-icon name="save" color="secondary" size="20px" /> <span class="subsection-title">Guardar</span>. Si todo ha ido bien, los cambios serán reflejados en la tabla junto a un mensaje de "Edificio modificado correctamente". En caso contrario, aparecerá un mensaje de aviso con el fallo que hubo.</div>
                <div> <q-icon name="delete" color="secondary" size="20px" /> <span class="subsection-title">Eliminar edificio</span>: Este botón parecerá al desplegar el menú <q-icon name="more_vert" color="secondary" size="20px" /> situado a la derecha de cada edificio listado. Al hacer click, desplegará un mensaje de advertencia informando que si procede a la elminación del edificio, todos los datos que dependen del mismo serán eliminados. En caso de proceder a eliminar, seleccionaremos el botón de <q-icon name="delete" color="secondary" size="20px" /> <span class="subsection-title">Elminar</span> y posteriormente los cambios serán reflejados en la tabla junto a un mensaje de "Edificio eliminado correctamente". En caso contrario, aparecerá un mensaje de aviso con el fallo que hubo.</div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator />

        <q-expansion-item class="grey-header" group="crypt" icon="view_module" :label="$t('routes.rooms')" header-class="text-secondary">
          <q-card>
            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
              commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
              eveniet doloribus ullam aliquid.
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator />

        <q-expansion-item class="grey-header" group="crypt" icon="reorder" :label="$t('routes.rows')" header-class="text-secondary">
          <q-card>
            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
              commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
              eveniet doloribus ullam aliquid.
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator />

        <q-expansion-item class="grey-header" group="crypt" icon="inventory" :label="$t('routes.niches')" header-class="text-secondary">
          <q-card>
            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
              commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
              eveniet doloribus ullam aliquid.
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator />

        <q-expansion-item class="grey-header" group="crypt" icon="grid_view" :label="$t('routes.urns')" header-class="text-secondary">
          <q-card>
            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
              commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
              eveniet doloribus ullam aliquid.
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator />

        <q-expansion-item class="rounded-bot grey-header" group="crypt" icon="map" :label="$t('routes.map')" header-class="text-secondary">
          <q-card class="rounded-bot">
            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
              commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
              eveniet doloribus ullam aliquid.
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>


      <div class="section-title">{{ $t('routes.record') }}</div>
      <q-list class="list-styled" bordered>
        <q-expansion-item class="rounded-top grey-header" group="record" icon="takeout_dining" :label="$t('routes.caskets')" header-class="text-secondary">
          <q-card>
            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
              commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
              eveniet doloribus ullam aliquid.
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator />

        <q-expansion-item class="rounded-bot grey-header" group="record" icon="people" :label="$t('routes.people')" header-class="text-secondary">
          <q-card class="rounded-bot">
            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
              commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
              eveniet doloribus ullam aliquid.
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>


      <div class="section-title">{{ $t('routes.management') }}</div>
      <q-list class="list-styled" bordered>
        <q-expansion-item class="rounded-top grey-header" group="management" icon="auto_stories" :label="$t('routes.reservations')" header-class="text-secondary">
          <q-card>
            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
              commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
              eveniet doloribus ullam aliquid.
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator />

        <q-expansion-item class="grey-header" group="crypt" icon="archive" :label="$t('routes.deposits')" header-class="text-secondary">
          <q-card>
            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
              commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
              eveniet doloribus ullam aliquid.
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator />

        <q-expansion-item class="rounded-bot grey-header" group="management" icon="swap_horiz" :label="$t('routes.relocations')" header-class="text-secondary">
          <q-card class="rounded-bot">
            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
              commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
              eveniet doloribus ullam aliquid.
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>

      <div class="section-title">{{ $t('routes.configuration') }}</div>
      <q-list class="list-styled" bordered>
        <q-expansion-item class="rounded-top rounded-bot grey-header" group="configuration" icon="manage_accounts" :label="$t('routes.users')" header-class="text-secondary">
          <q-card class="rounded-bot">
            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
              commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
              eveniet doloribus ullam aliquid.
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import TitleComponent from 'src/components/title/title-component'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    TitleComponent,
  },
  setup() {

    return {
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
  }
</style>