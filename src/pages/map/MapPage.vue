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
            <div class="niche" :class="getNicheClassColor(118)" @click="openMapInfoModal(118)">F3</div>
            <div class="niche" :class="getNicheClassColor(63)" @click="openMapInfoModal(63)">F2</div>
            <div class="niche" :class="getNicheClassColor(8)" @click="openMapInfoModal(8)">F1</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="wall" style="flex:1"></div>
            <div class="niche" :class="getNicheClassColor(117)" @click="openMapInfoModal(117)">F3</div>
            <div class="niche" :class="getNicheClassColor(62)" @click="openMapInfoModal(62)">F2</div>
            <div class="niche" :class="getNicheClassColor(7)" @click="openMapInfoModal(7)">F1</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="wall" style="flex:1"></div>
            <div class="niche" :class="getNicheClassColor(116)" @click="openMapInfoModal(116)">F3</div>
            <div class="niche" :class="getNicheClassColor(61)" @click="openMapInfoModal(61)">F2</div>
            <div class="niche" :class="getNicheClassColor(6)" @click="openMapInfoModal(6)">F1</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="wall" style="flex:1"></div>
            <div class="niche" :class="getNicheClassColor(115)" @click="openMapInfoModal(115)">F3</div>
            <div class="niche" :class="getNicheClassColor(60)" @click="openMapInfoModal(60)">F2</div>
            <div class="niche" :class="getNicheClassColor(5)" @click="openMapInfoModal(5)">F1</div>
          </div>
          <div class="wall"></div>
          <div class="wall" style="width:72px"></div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="flex">
              <div class="niche" :class="getNicheClassColor(111)" @click="openMapInfoModal(111)">F3</div>
              <div class="niche" :class="getNicheClassColor(56)" @click="openMapInfoModal(56)">F2</div>
              <div class="niche" :class="getNicheClassColor(1)" @click="openMapInfoModal(1)">F1</div>
            </div>
            <div class="wall"></div>
            <div class="flex">
              <div class="niche" :class="getNicheClassColor(112)" @click="openMapInfoModal(112)">F3</div>
              <div class="niche" :class="getNicheClassColor(57)" @click="openMapInfoModal(57)">F2</div>
              <div class="niche" :class="getNicheClassColor(2)" @click="openMapInfoModal(2)">F1</div>
            </div>
            <div class="wall"></div>
            <div class="flex">
              <div class="niche" :class="getNicheClassColor(113)" @click="openMapInfoModal(113)">F3</div>
              <div class="niche" :class="getNicheClassColor(58)" @click="openMapInfoModal(58)">F2</div>
              <div class="niche" :class="getNicheClassColor(3)" @click="openMapInfoModal(3)">F1</div>
            </div>
            <div class="wall"></div>
            <div class="flex">
              <div class="niche" :class="getNicheClassColor(114)" @click="openMapInfoModal(114)">F3</div>
              <div class="niche" :class="getNicheClassColor(59)" @click="openMapInfoModal(59)">F2</div>
              <div class="niche" :class="getNicheClassColor(4)" @click="openMapInfoModal(4)">F1</div>
            </div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="row-number">00</div>
            <div class="invisible-wall"></div>
            <div class="row-number">01</div>
            <div class="invisible-wall"></div>
            <div class="row-number">02</div>
            <div class="invisible-wall"></div>
            <div class="row-number">03</div>
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
              <div class="niche" :class="getNicheClassColor(55)" @click="openMapInfoModal(55)">F1</div>
              <div class="niche" :class="getNicheClassColor(110)" @click="openMapInfoModal(110)">F2</div>
              <div class="niche" :class="getNicheClassColor(165)" @click="openMapInfoModal(165)">F3</div>
            </div>
            <div class="wall"></div>
            <div class="flex">
              <div class="niche" :class="getNicheClassColor(54)" @click="openMapInfoModal(54)">F1</div>
              <div class="niche" :class="getNicheClassColor(109)" @click="openMapInfoModal(109)">F2</div>
              <div class="niche" :class="getNicheClassColor(164)" @click="openMapInfoModal(164)">F3</div>
            </div>
          </div>
          <div class="wall"></div>
          <div class="wall" style="width:42px"></div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="wall" style="flex:1"></div>
            <div class="niche" :class="getNicheClassColor(163)" @click="openMapInfoModal(163)">F3</div>
            <div class="niche" :class="getNicheClassColor(108)" @click="openMapInfoModal(108)">F2</div>
            <div class="niche" :class="getNicheClassColor(53)" @click="openMapInfoModal(53)">F1</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="wall" style="flex:1"></div>
            <div class="niche" :class="getNicheClassColor(162)" @click="openMapInfoModal(162)">F3</div>
            <div class="niche" :class="getNicheClassColor(107)" @click="openMapInfoModal(107)">F2</div>
            <div class="niche" :class="getNicheClassColor(52)" @click="openMapInfoModal(52)">F1</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="wall" style="flex:1"></div>
            <div class="niche" :class="getNicheClassColor(161)" @click="openMapInfoModal(161)">F3</div>
            <div class="niche" :class="getNicheClassColor(106)" @click="openMapInfoModal(106)">F2</div>
            <div class="niche" :class="getNicheClassColor(51)" @click="openMapInfoModal(51)">F1</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="wall" style="flex:1"></div>
            <div class="niche" :class="getNicheClassColor(160)" @click="openMapInfoModal(160)">F3</div>
            <div class="niche" :class="getNicheClassColor(105)" @click="openMapInfoModal(105)">F2</div>
            <div class="niche" :class="getNicheClassColor(50)" @click="openMapInfoModal(50)">F1</div>
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
          <div class="row-number">07</div>
          <div class="invisible-wall"></div>
          <div class="row-number">06</div>
          <div class="invisible-wall"></div>
          <div class="row-number">05</div>
          <div class="invisible-wall"></div>
          <div class="row-number">04</div>
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
          <div class="row-number">08</div>
          <div class="invisible-wall"></div>
          <div class="row-number">09</div>
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
            <div class="niche" :class="getNicheClassColor(9)" @click="openMapInfoModal(9)">F1</div>
            <div class="niche" :class="getNicheClassColor(64)" @click="openMapInfoModal(64)">F2</div>
            <div class="niche" :class="getNicheClassColor(119)" @click="openMapInfoModal(119)">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche" :class="getNicheClassColor(10)" @click="openMapInfoModal(10)">F1</div>
            <div class="niche" :class="getNicheClassColor(65)" @click="openMapInfoModal(65)">F2</div>
            <div class="niche" :class="getNicheClassColor(120)" @click="openMapInfoModal(120)">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche" :class="getNicheClassColor(11)" @click="openMapInfoModal(11)">F1</div>
            <div class="niche" :class="getNicheClassColor(66)" @click="openMapInfoModal(66)">F2</div>
            <div class="niche" :class="getNicheClassColor(121)" @click="openMapInfoModal(121)">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche" :class="getNicheClassColor(12)" @click="openMapInfoModal(12)">F1</div>
            <div class="niche" :class="getNicheClassColor(67)" @click="openMapInfoModal(67)">F2</div>
            <div class="niche" :class="getNicheClassColor(122)" @click="openMapInfoModal(122)">F3</div>
          </div>
          <div class="wall"></div>
          <div class="wall" style="width:98px"></div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche" :class="getNicheClassColor(13)" @click="openMapInfoModal(13)">F1</div>
            <div class="niche" :class="getNicheClassColor(68)" @click="openMapInfoModal(68)">F2</div>
            <div class="niche" :class="getNicheClassColor(123)" @click="openMapInfoModal(123)">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche" :class="getNicheClassColor(14)" @click="openMapInfoModal(14)">F1</div>
            <div class="niche" :class="getNicheClassColor(69)" @click="openMapInfoModal(69)">F2</div>
            <div class="niche" :class="getNicheClassColor(124)" @click="openMapInfoModal(124)">F3</div>
          </div>
          <div class="wall"></div>
          <div class="floor" style="width:98px"></div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche" :class="getNicheClassColor(44)" @click="openMapInfoModal(44)">F1</div>
            <div class="niche" :class="getNicheClassColor(99)" @click="openMapInfoModal(99)">F2</div>
            <div class="niche" :class="getNicheClassColor(154)" @click="openMapInfoModal(154)">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche" :class="getNicheClassColor(45)" @click="openMapInfoModal(45)">F1</div>
            <div class="niche" :class="getNicheClassColor(100)" @click="openMapInfoModal(100)">F2</div>
            <div class="niche" :class="getNicheClassColor(155)" @click="openMapInfoModal(155)">F3</div>
          </div>
          <div class="wall"></div>
          <div class="wall" style="width:64px"></div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche" :class="getNicheClassColor(46)" @click="openMapInfoModal(46)">F1</div>
            <div class="niche" :class="getNicheClassColor(101)" @click="openMapInfoModal(101)">F2</div>
            <div class="niche" :class="getNicheClassColor(156)" @click="openMapInfoModal(156)">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche" :class="getNicheClassColor(47)" @click="openMapInfoModal(47)">F1</div>
            <div class="niche" :class="getNicheClassColor(102)" @click="openMapInfoModal(102)">F2</div>
            <div class="niche" :class="getNicheClassColor(157)" @click="openMapInfoModal(157)">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche" :class="getNicheClassColor(48)" @click="openMapInfoModal(48)">F1</div>
            <div class="niche" :class="getNicheClassColor(103)" @click="openMapInfoModal(103)">F2</div>
            <div class="niche" :class="getNicheClassColor(158)" @click="openMapInfoModal(158)">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche" :class="getNicheClassColor(49)" @click="openMapInfoModal(49)">F1</div>
            <div class="niche" :class="getNicheClassColor(104)" @click="openMapInfoModal(104)">F2</div>
            <div class="niche" :class="getNicheClassColor(159)" @click="openMapInfoModal(159)">F3</div>
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
            <div class="niche" :class="getNicheClassColor(130)" @click="openMapInfoModal(130)">F3</div>
            <div class="niche" :class="getNicheClassColor(75)" @click="openMapInfoModal(75)">F2</div>
            <div class="niche" :class="getNicheClassColor(20)" @click="openMapInfoModal(20)">F1</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche" :class="getNicheClassColor(129)" @click="openMapInfoModal(129)">F3</div>
            <div class="niche" :class="getNicheClassColor(74)" @click="openMapInfoModal(74)">F2</div>
            <div class="niche" :class="getNicheClassColor(19)" @click="openMapInfoModal(19)">F1</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche" :class="getNicheClassColor(128)" @click="openMapInfoModal(128)">F3</div>
            <div class="niche" :class="getNicheClassColor(73)" @click="openMapInfoModal(73)">F2</div>
            <div class="niche" :class="getNicheClassColor(18)" @click="openMapInfoModal(18)">F1</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche" :class="getNicheClassColor(127)" @click="openMapInfoModal(127)">F3</div>
            <div class="niche" :class="getNicheClassColor(72)" @click="openMapInfoModal(72)">F2</div>
            <div class="niche" :class="getNicheClassColor(17)" @click="openMapInfoModal(17)">F1</div>
          </div>
          <div class="wall"></div>
          <div class="wall" style="width:98px"></div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche" :class="getNicheClassColor(126)" @click="openMapInfoModal(126)">F3</div>
            <div class="niche" :class="getNicheClassColor(71)" @click="openMapInfoModal(71)">F2</div>
            <div class="niche" :class="getNicheClassColor(16)" @click="openMapInfoModal(16)">F1</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche" :class="getNicheClassColor(125)" @click="openMapInfoModal(125)">F3</div>
            <div class="niche" :class="getNicheClassColor(70)" @click="openMapInfoModal(70)">F2</div>
            <div class="niche" :class="getNicheClassColor(15)" @click="openMapInfoModal(15)">F1</div>
          </div>
          <div class="wall"></div>
          <div class="floor" style="width:98px"></div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche" :class="getNicheClassColor(153)" @click="openMapInfoModal(153)">F3</div>
            <div class="niche" :class="getNicheClassColor(98)" @click="openMapInfoModal(98)">F2</div>
            <div class="niche" :class="getNicheClassColor(43)" @click="openMapInfoModal(43)">F1</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche" :class="getNicheClassColor(152)" @click="openMapInfoModal(152)">F3</div>
            <div class="niche" :class="getNicheClassColor(97)" @click="openMapInfoModal(97)">F2</div>
            <div class="niche" :class="getNicheClassColor(42)" @click="openMapInfoModal(42)">F1</div>
          </div>
          <div class="wall"></div>
          <div class="wall" style="width:64px"></div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche" :class="getNicheClassColor(151)" @click="openMapInfoModal(151)">F3</div>
            <div class="niche" :class="getNicheClassColor(96)" @click="openMapInfoModal(96)">F2</div>
            <div class="niche" :class="getNicheClassColor(41)" @click="openMapInfoModal(41)">F1</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche" :class="getNicheClassColor(150)" @click="openMapInfoModal(150)">F3</div>
            <div class="niche" :class="getNicheClassColor(95)" @click="openMapInfoModal(95)">F2</div>
            <div class="niche" :class="getNicheClassColor(40)" @click="openMapInfoModal(40)">F1</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche" :class="getNicheClassColor(149)" @click="openMapInfoModal(149)">F3</div>
            <div class="niche" :class="getNicheClassColor(94)" @click="openMapInfoModal(94)">F2</div>
            <div class="niche" :class="getNicheClassColor(39)" @click="openMapInfoModal(39)">F1</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche" :class="getNicheClassColor(148)" @click="openMapInfoModal(148)">F3</div>
            <div class="niche" :class="getNicheClassColor(93)" @click="openMapInfoModal(93)">F2</div>
            <div class="niche" :class="getNicheClassColor(38)" @click="openMapInfoModal(38)">F1</div>
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
            <div class="niche" :class="getNicheClassColor(21)" @click="openMapInfoModal(21)">F1</div>
            <div class="niche" :class="getNicheClassColor(76)" @click="openMapInfoModal(76)">F2</div>
            <div class="niche" :class="getNicheClassColor(131)" @click="openMapInfoModal(131)">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche" :class="getNicheClassColor(22)" @click="openMapInfoModal(22)">F1</div>
            <div class="niche" :class="getNicheClassColor(77)" @click="openMapInfoModal(77)">F2</div>
            <div class="niche" :class="getNicheClassColor(132)" @click="openMapInfoModal(132)">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche" :class="getNicheClassColor(23)" @click="openMapInfoModal(23)">F1</div>
            <div class="niche" :class="getNicheClassColor(78)" @click="openMapInfoModal(78)">F2</div>
            <div class="niche" :class="getNicheClassColor(133)" @click="openMapInfoModal(133)">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche" :class="getNicheClassColor(24)" @click="openMapInfoModal(24)">F1</div>
            <div class="niche" :class="getNicheClassColor(79)" @click="openMapInfoModal(79)">F2</div>
            <div class="niche" :class="getNicheClassColor(134)" @click="openMapInfoModal(134)">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche" :class="getNicheClassColor(25)" @click="openMapInfoModal(25)">F1</div>
            <div class="niche" :class="getNicheClassColor(80)" @click="openMapInfoModal(80)">F2</div>
            <div class="niche" :class="getNicheClassColor(135)" @click="openMapInfoModal(135)">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche" :class="getNicheClassColor(26)" @click="openMapInfoModal(26)">F1</div>
            <div class="niche" :class="getNicheClassColor(81)" @click="openMapInfoModal(81)">F2</div>
            <div class="niche" :class="getNicheClassColor(136)" @click="openMapInfoModal(136)">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche" :class="getNicheClassColor(27)" @click="openMapInfoModal(27)">F1</div>
            <div class="niche" :class="getNicheClassColor(82)" @click="openMapInfoModal(82)">F2</div>
            <div class="niche" :class="getNicheClassColor(137)" @click="openMapInfoModal(137)">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche" :class="getNicheClassColor(28)" @click="openMapInfoModal(28)">F1</div>
            <div class="niche" :class="getNicheClassColor(83)" @click="openMapInfoModal(83)">F2</div>
            <div class="niche" :class="getNicheClassColor(138)" @click="openMapInfoModal(138)">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche" :class="getNicheClassColor(29)" @click="openMapInfoModal(29)">F1</div>
            <div class="niche" :class="getNicheClassColor(84)" @click="openMapInfoModal(84)">F2</div>
            <div class="niche" :class="getNicheClassColor(139)" @click="openMapInfoModal(139)">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche" :class="getNicheClassColor(30)" @click="openMapInfoModal(30)">F1</div>
            <div class="niche" :class="getNicheClassColor(85)" @click="openMapInfoModal(85)">F2</div>
            <div class="niche" :class="getNicheClassColor(140)" @click="openMapInfoModal(140)">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche" :class="getNicheClassColor(31)" @click="openMapInfoModal(31)">F1</div>
            <div class="niche" :class="getNicheClassColor(86)" @click="openMapInfoModal(86)">F2</div>
            <div class="niche" :class="getNicheClassColor(141)" @click="openMapInfoModal(141)">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche" :class="getNicheClassColor(32)" @click="openMapInfoModal(32)">F1</div>
            <div class="niche" :class="getNicheClassColor(87)" @click="openMapInfoModal(87)">F2</div>
            <div class="niche" :class="getNicheClassColor(142)" @click="openMapInfoModal(142)">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche" :class="getNicheClassColor(33)" @click="openMapInfoModal(33)">F1</div>
            <div class="niche" :class="getNicheClassColor(88)" @click="openMapInfoModal(88)">F2</div>
            <div class="niche" :class="getNicheClassColor(143)" @click="openMapInfoModal(143)">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche" :class="getNicheClassColor(34)" @click="openMapInfoModal(34)">F1</div>
            <div class="niche" :class="getNicheClassColor(89)" @click="openMapInfoModal(89)">F2</div>
            <div class="niche" :class="getNicheClassColor(144)" @click="openMapInfoModal(144)">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche" :class="getNicheClassColor(35)" @click="openMapInfoModal(35)">F1</div>
            <div class="niche" :class="getNicheClassColor(90)" @click="openMapInfoModal(90)">F2</div>
            <div class="niche" :class="getNicheClassColor(145)" @click="openMapInfoModal(145)">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche" :class="getNicheClassColor(36)" @click="openMapInfoModal(36)">F1</div>
            <div class="niche" :class="getNicheClassColor(91)" @click="openMapInfoModal(91)">F2</div>
            <div class="niche" :class="getNicheClassColor(146)" @click="openMapInfoModal(146)">F3</div>
          </div>
          <div class="wall"></div>
          <div class="flex column">
            <div class="niche" :class="getNicheClassColor(37)" @click="openMapInfoModal(37)">F1</div>
            <div class="niche" :class="getNicheClassColor(92)" @click="openMapInfoModal(92)">F2</div>
            <div class="niche" :class="getNicheClassColor(147)" @click="openMapInfoModal(147)">F3</div>
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
import { hideLoading, showLoading } from 'src/utils/quasarComponents'
import TitleComponent from 'src/components/title/title-component'
import { defineComponent, onMounted, reactive } from 'vue'
import { useNicheStore } from 'stores/niche'
import bus from 'boot/bus'

export default defineComponent({
  components: {
    TitleComponent
  },
  setup() {
    onMounted(() => {
      fetchData()
    })

    const nicheStore = useNicheStore()

    const state = reactive({
      loading: false,
      nichesStatus: null
    })

    const fetchData = async () => {
      try {
        state.loading = showLoading()
        const data = await nicheStore.getNichesStatus()
        state.nichesStatus = data
        state.loading = hideLoading()
      } catch (error) {
        state.loading = hideLoading()
      }
    }

    const getNicheClassColor = (nicheId) => {
      if (state.nichesStatus?.available?.includes(nicheId)) {
        return 'green-niche'
      }
      if (state.nichesStatus?.reserved?.includes(nicheId)) {
        return 'yellow-niche'
      }
      if (state.nichesStatus?.expired?.includes(nicheId)) {
        return 'purple-niche'
      }
      if (state.nichesStatus?.occupied?.includes(nicheId)) {
        return 'red-niche'
      }
      if (state.nichesStatus?.disabled?.includes(nicheId)) {
        return 'black-niche'
      }
    }

    const openMapInfoModal = async (nicheId) => {
      try {
        state.loading = showLoading()
        const { data } = await nicheStore.getNicheWithUrns(nicheId)
        bus.$emit('openMapInfoModal', data)
        state.loading = hideLoading()
      } catch (error) {
        state.loading = hideLoading()
      }
    }

    return {
      openMapInfoModal,
      getNicheClassColor
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
          background: var(--background-color);
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
      background: var(--background-color);
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