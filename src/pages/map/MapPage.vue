<template>
  <div class="full-container flex column no-wrap gap-20">
    <title-component :title="$t('pages.map.title')" />
    <!-- <div>Rojo: Consulta que traiga los nichos ocupados para pintar el estado</div>
    <div>Amarillo: Consulta que traiga los nichos ocupados y con al menos una reserva para pintar el estado</div> -->

    <div class="zoom-container">
      <div class="leyend flex justify-between">
        <div class="leyend-content">
          <div class="color-square green-niche"></div>
          <div class="leyend-text">Disponible</div>
        </div>
        <div class="leyend-content">
          <div class="color-square yellow-niche"></div>
          <div class="leyend-text">Reservado</div>
        </div>
        <div class="leyend-content">
          <div class="color-square red-niche"></div>
          <div class="leyend-text">Ocupado</div>
        </div>
        <div class="leyend-content">
          <div class="color-square purple-niche"></div>
          <div class="leyend-text">Caducado</div>
        </div>
        <div class="leyend-content">
          <div class="color-square black-niche"></div>
          <div class="leyend-text">Deshabilitado</div>
        </div>
      </div>
      <div class="map-container">
        <div class="row">
          <div class="wall full-width"></div>
        </div>

        <!-- Primera fila -->
        <div class="row">
          <div class="wall"></div>
          <div class="flex column">
            <div class="wall" style="flex:1"></div>
            <div class="niche" @click="openMapInfoModal()">x</div>
            <div class="niche">F2</div>
            <div class="niche">F1</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="wall" style="flex:1"></div>
            <div class="niche">F3</div>
            <div class="niche">F2</div>
            <div class="niche">F1</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="wall" style="flex:1"></div>
            <div class="niche">F3</div>
            <div class="niche">F2</div>
            <div class="niche">F1</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="wall" style="flex:1"></div>
            <div class="niche">F3</div>
            <div class="niche">F2</div>
            <div class="niche">F1</div>
          </div>
          <div class="wall"></div>
          <div class="wall" style="width:72px"></div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="flex">
              <div class="niche">F3</div>
              <div class="niche">F2</div>
              <div class="niche">F1</div>
            </div>
            <div class="wall"></div>
            <div class="flex">
              <div class="niche">F3</div>
              <div class="niche">F2</div>
              <div class="niche">F1</div>
            </div>
            <div class="wall"></div>
            <div class="flex">
              <div class="niche">F3</div>
              <div class="niche">F2</div>
              <div class="niche">F1</div>
            </div>
            <div class="wall"></div>
            <div class="flex">
              <div class="niche">F3</div>
              <div class="niche">F2</div>
              <div class="niche">F1</div>
            </div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="row-number">0</div>
            <div class="invisible-wall"></div>
            <div class="row-number">1</div>
            <div class="invisible-wall"></div>
            <div class="row-number">2</div>
            <div class="invisible-wall"></div>
            <div class="row-number">3</div>
          </div>

          <div class="floor flex justify-center items-start" style="flex:1">
            <q-icon name="stairs" color="secondary" size="25px" />
          </div>

          <div class="flex column">
            <div class="floor" style="flex:1"></div>
            <div class="invisible-wall"></div>
            <div class="row-number">54</div>
            <div class="invisible-wall"></div>
            <div class="row-number">53</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="wall" style="flex:1"></div>
            <div class="wall"></div>
            <div class="flex">
              <div class="niche">F1</div>
              <div class="niche">F2</div>
              <div class="niche">F3</div>
            </div>
            <div class="wall"></div>
            <div class="flex">
              <div class="niche">F1</div>
              <div class="niche">F2</div>
              <div class="niche">F3</div>
            </div>
          </div>
          <div class="wall"></div>
          <div class="wall" style="width:42px"></div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="wall" style="flex:1"></div>
            <div class="niche">F3</div>
            <div class="niche">F2</div>
            <div class="niche">F1</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="wall" style="flex:1"></div>
            <div class="niche">F3</div>
            <div class="niche">F2</div>
            <div class="niche">F1</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="wall" style="flex:1"></div>
            <div class="niche">F3</div>
            <div class="niche">F2</div>
            <div class="niche">F1</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="wall" style="flex:1"></div>
            <div class="niche">F3</div>
            <div class="niche">F2</div>
            <div class="niche">F1</div>
          </div>
          <div class="wall"></div>
        </div>

        <div class="row">
          <div class="wall" style="width:310px"></div>
          <div class="floor" style="flex:1"></div>
          <div class="wall" style="width:280px"></div>
        </div>

        <div class="row">
          <div class="wall"></div>
          <div class="row-number">7</div>
          <div class="invisible-wall"></div>
          <div class="row-number">6</div>
          <div class="invisible-wall"></div>
          <div class="row-number">5</div>
          <div class="invisible-wall"></div>
          <div class="row-number">4</div>
          <div class="invisible-wall"></div>
          <div class="floor" style="flex:1"></div>
          <div class="invisible-wall"></div>
          <div class="row-number">52</div>
          <div class="invisible-wall"></div>
          <div class="row-number">51</div>
          <div class="invisible-wall"></div>
          <div class="row-number">50</div>
          <div class="invisible-wall"></div>
          <div class="row-number">49</div>
          <div class="wall"></div>
        </div>

        <div class="row">
          <div class="wall"></div>
          <div class="floor" style="flex:1; height:30px"></div>
          <div class="wall"></div>
        </div>

        <div class="row">
          <div class="wall"></div>
          <div class="row-number">8</div>
          <div class="invisible-wall"></div>
          <div class="row-number">9</div>
          <div class="invisible-wall"></div>
          <div class="row-number">10</div>
          <div class="invisible-wall"></div>
          <div class="row-number">11</div>
          <div class="invisible-wall"></div>
          <div class="floor" style="width:98px"></div>
          <div class="invisible-wall"></div>
          <div class="row-number">12</div>
          <div class="invisible-wall"></div>
          <div class="row-number">13</div>
          <div class="invisible-wall"></div>
          <div class="floor" style="width:98px"></div>
          <div class="invisible-wall"></div>
          <div class="row-number">43</div>
          <div class="invisible-wall"></div>
          <div class="row-number">44</div>
          <div class="invisible-wall"></div>
          <div class="floor" style="width:64px"></div>
          <div class="invisible-wall"></div>
          <div class="row-number">45</div>
          <div class="invisible-wall"></div>
          <div class="row-number">46</div>
          <div class="invisible-wall"></div>
          <div class="row-number">47</div>
          <div class="invisible-wall"></div>
          <div class="row-number">48</div>
          <div class="wall"></div>
        </div>

        <div class="row">
          <div class="wall" style="width:310px"></div>
          <div class="floor" style="flex:1"></div>
          <div class="wall" style="width:276px"></div>
        </div>

        <!-- Segunda fila -->
        <div class="row">
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F1</div>
            <div class="niche">F2</div>
            <div class="niche">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F1</div>
            <div class="niche">F2</div>
            <div class="niche">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F1</div>
            <div class="niche">F2</div>
            <div class="niche">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F1</div>
            <div class="niche">F2</div>
            <div class="niche">F3</div>
          </div>
          <div class="wall"></div>
          <div class="wall" style="width:98px"></div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F1</div>
            <div class="niche">F2</div>
            <div class="niche">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F1</div>
            <div class="niche">F2</div>
            <div class="niche">F3</div>
          </div>
          <div class="wall"></div>
          <div class="floor" style="width:98px"></div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F1</div>
            <div class="niche">F2</div>
            <div class="niche">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F1</div>
            <div class="niche">F2</div>
            <div class="niche">F3</div>
          </div>
          <div class="wall"></div>
          <div class="wall" style="width:64px"></div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F1</div>
            <div class="niche">F2</div>
            <div class="niche">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F1</div>
            <div class="niche">F2</div>
            <div class="niche">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F1</div>
            <div class="niche">F2</div>
            <div class="niche">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F1</div>
            <div class="niche">F2</div>
            <div class="niche">F3</div>
          </div>
          <div class="wall"></div>
        </div>

        <div class="row">
          <div class="wall" style="width:310px"></div>
          <div class="floor" style="flex:1"></div>
          <div class="wall" style="width:276px"></div>
        </div>

        <div class="row">
          <div class="wall" style="width:310px"></div>
          <div class="floor" style="flex:1"></div>
          <div class="wall" style="width:276px"></div>
        </div>

        <!-- Tercera fila -->
        <div class="row">
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F3</div>
            <div class="niche">F2</div>
            <div class="niche">F1</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F3</div>
            <div class="niche">F2</div>
            <div class="niche">F1</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F3</div>
            <div class="niche">F2</div>
            <div class="niche">F1</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F3</div>
            <div class="niche">F2</div>
            <div class="niche">F1</div>
          </div>
          <div class="wall"></div>
          <div class="wall" style="width:98px"></div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F3</div>
            <div class="niche">F2</div>
            <div class="niche">F1</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F3</div>
            <div class="niche">F2</div>
            <div class="niche">F1</div>
          </div>
          <div class="wall"></div>
          <div class="floor" style="width:98px"></div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F3</div>
            <div class="niche">F2</div>
            <div class="niche">F1</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F3</div>
            <div class="niche">F2</div>
            <div class="niche">F1</div>
          </div>
          <div class="wall"></div>
          <div class="wall" style="width:64px"></div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F3</div>
            <div class="niche">F2</div>
            <div class="niche">F1</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F3</div>
            <div class="niche">F2</div>
            <div class="niche">F1</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F3</div>
            <div class="niche">F2</div>
            <div class="niche">F1</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F3</div>
            <div class="niche">F2</div>
            <div class="niche">F1</div>
          </div>
          <div class="wall"></div>
        </div>

        <div class="row">
          <div class="wall" style="width:310px"></div>
          <div class="floor" style="flex:1"></div>
          <div class="wall" style="width:276px"></div>
        </div>

        <div class="row">
          <div class="wall"></div>
          <div class="row-number">19</div>
          <div class="invisible-wall"></div>
          <div class="row-number">18</div>
          <div class="invisible-wall"></div>
          <div class="row-number">17</div>
          <div class="invisible-wall"></div>
          <div class="row-number">16</div>
          <div class="invisible-wall"></div>
          <div class="floor" style="width:98px"></div>
          <div class="invisible-wall"></div>
          <div class="row-number">15</div>
          <div class="invisible-wall"></div>
          <div class="row-number">14</div>
          <div class="invisible-wall"></div>
          <div class="floor" style="width:98px"></div>
          <div class="invisible-wall"></div>
          <div class="row-number">42</div>
          <div class="invisible-wall"></div>
          <div class="row-number">41</div>
          <div class="invisible-wall"></div>
          <div class="floor" style="width:64px"></div>
          <div class="invisible-wall"></div>
          <div class="row-number">40</div>
          <div class="invisible-wall"></div>
          <div class="row-number">39</div>
          <div class="invisible-wall"></div>
          <div class="row-number">38</div>
          <div class="invisible-wall"></div>
          <div class="row-number">37</div>
          <div class="wall"></div>
        </div>

        <div class="row">
          <div class="wall"></div>
          <div class="floor" style="flex:1; height:30px"></div>
          <div class="wall"></div>
        </div>

        <div class="row">
          <div class="wall"></div>
          <div class="floor" style="width:102px"></div>
          <div class="row-number">20</div>
          <div class="invisible-wall"></div>
          <div class="row-number">21</div>
          <div class="invisible-wall"></div>
          <div class="row-number">22</div>
          <div class="invisible-wall"></div>
          <div class="row-number">23</div>
          <div class="invisible-wall"></div>
          <div class="row-number">24</div>
          <div class="invisible-wall"></div>
          <div class="row-number">25</div>
          <div class="invisible-wall"></div>
          <div class="row-number">26</div>
          <div class="invisible-wall"></div>
          <div class="row-number">27</div>
          <div class="invisible-wall"></div>
          <div class="row-number">28</div>
          <div class="invisible-wall"></div>
          <div class="row-number">29</div>
          <div class="invisible-wall"></div>
          <div class="row-number">30</div>
          <div class="invisible-wall"></div>
          <div class="row-number">31</div>
          <div class="invisible-wall"></div>
          <div class="row-number">32</div>
          <div class="invisible-wall"></div>
          <div class="row-number">33</div>
          <div class="invisible-wall"></div>
          <div class="row-number">34</div>
          <div class="invisible-wall"></div>
          <div class="row-number">35</div>
          <div class="invisible-wall"></div>
          <div class="row-number">36</div>
          <div class="wall"></div>
        </div>

        <div class="row">
          <div class="wall"></div>
          <div class="floor" style="width:98px"></div>
          <div class="wall" style="flex:1"></div>
        </div>

        <!-- Cuarta fila -->
        <div class="row">
          <div class="wall"></div>
          <!-- <div class="floor" style="width:34px"></div> -->
          <div class="floor flex column justify-end items-center" style="width:98px">
            <q-icon name="stairs" color="secondary" size="25px" />
            <div style="font-size:12px;font-weight:500" class="text-secondary">Entrada</div>
          </div>
          <!-- <div class="floor" style="width:34px"></div> -->
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F1</div>
            <div class="niche">F2</div>
            <div class="niche">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F1</div>
            <div class="niche">F2</div>
            <div class="niche">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F1</div>
            <div class="niche">F2</div>
            <div class="niche">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F1</div>
            <div class="niche">F2</div>
            <div class="niche">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F1</div>
            <div class="niche">F2</div>
            <div class="niche">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F1</div>
            <div class="niche">F2</div>
            <div class="niche">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F1</div>
            <div class="niche">F2</div>
            <div class="niche">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F1</div>
            <div class="niche">F2</div>
            <div class="niche">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F1</div>
            <div class="niche">F2</div>
            <div class="niche">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F1</div>
            <div class="niche">F2</div>
            <div class="niche">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F1</div>
            <div class="niche">F2</div>
            <div class="niche">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F1</div>
            <div class="niche">F2</div>
            <div class="niche">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F1</div>
            <div class="niche">F2</div>
            <div class="niche">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F1</div>
            <div class="niche">F2</div>
            <div class="niche">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F1</div>
            <div class="niche">F2</div>
            <div class="niche">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F1</div>
            <div class="niche">F2</div>
            <div class="niche">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche">F1</div>
            <div class="niche">F2</div>
            <div class="niche">F3</div>
          </div>
          <div class="wall"></div>
        </div>

        <div class="row">
          <div class="wall full-width"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleComponent from 'src/components/title/title-component'
import { defineComponent } from 'vue'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    TitleComponent
  },
  setup() {
    const openMapInfoModal = () => {
      bus.$emit('openMapInfoModal')
    }

    return {
      openMapInfoModal
    }
  },
})
</script>


<style lang="scss" scoped>
  .zoom-container {
    zoom: 134%;
    max-width: max-content;
    min-width: max-content;
      margin-bottom: 20px;
    .map-container {
      border: 2px solid black;
      background: var(--background-color);
      display: flex;
      flex-direction: column;

      .row {
        display: flex;
        .wall {
          min-width: 4px;
          min-height: 4px;
          background: #c7cbce;
        }
        .invisible-wall {
          min-width: 4px;
          min-height: 4px;
          background: var(--background-color);
        }
        .floor {
          min-width: 4px;
          min-height: 4px;
          background: var(--background-color);
        }

        .niche {
          background: #91d79d;
          border: 1px solid var(--main-text-color);
          color: var(--main-text-color);
          width: 30px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          // transition: 0.2s all ease;
          &:hover {
            border: 3px solid $secondary;
            font-weight: 500;
          }
        }

        .row-number {
          background: var(--background-color);
          color: var(--secondary-text-color);
          width: 30px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    .leyend {
      border: 2px solid var(--main-text-color);
      border-bottom: none;
      padding: 5px 10px;
      .leyend-content {
        display: flex;
        align-items: center;
        gap: 5px;
        .color-square {
          border: 1px solid var(--main-text-color);
          border-radius: 6px;
          width: 20px;
          height: 20px;
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
          font-size: 12px;
          font-weight: 500;
        }
      }
    }
  }
</style>