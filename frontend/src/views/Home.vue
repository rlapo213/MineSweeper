<template>
  <div class="homelayout">
    <div class="home">
      <MineForm
        style="position: absolute;
  left: 0;
  top: 0;"
      />
      <div class="flexbox">
        <div class="elementsrow">
          <div id="cnt">{{ Minecount }}</div>
          <Refresh />
          <div id="timer">{{ Timer }}</div>
        </div>
        <Table />
      </div>
    </div>

    <div class="res">
      {{ result }}
    </div>
  </div>
</template>

<script>
//mapState 사용
import { mapState } from "vuex";
import store, { Timer } from "../store/index";
import { Minecount } from "../store/index";
import Table from "../components/Table";
import MineForm from "../components/MineForm";
import Refresh from "../components/Refresh";
import { GameStart } from "../store/index";
let interval;
export default {
  store,
  components: {
    Table,
    MineForm,
    Refresh,
  },
  created() {
    this.$store.commit(GameStart, {
      row: this.$store.state.data.row,
      col: this.$store.state.data.col,
      mine: this.$store.state.data.mine,
    });
  },
  computed: {
    //mapped computed 속성의 이름이 상태 하위 트리이름과 동일할
    //경우 문자열 배열을 mapState로 넘길 수 있다
    ...mapState(["Timer", "result", "halted", "Minecount"]),
  },
  watch: {
    halted(value, oldvalue) {
      //게임시작
      if (value === false) {
        interval = setInterval(() => {
          this.$store.commit(Timer);
        }, 1000);
      }
      //중단
      else {
        clearInterval(interval);
      }
    },
  },
};
</script>

<style>
table {
  border-collapse: collapse;
}
td {
  border: 1px solid black;
  width: 40px;
  height: 40px;
  text-align: center;
}
.home {
  display: flex;
  flex-direction: row;
  align-items: center;
  top: 0;
  position: absolute;
  width: 100vw;
  height: 100vh;
}
#timer,
#cnt {
  margin: 10px;
  font-size: 3em;
}
.flexbox {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  left: 20vw;
}
.res {
  position: absolute;
  display: flex;
  flex-direction: column;
  font-size: 3em;
  right: 5vw;
  top: 1vh;
}
.homelayout {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  background: #fc00aa;
  background: -webkit-linear-gradient(to right, #fc00aa, #00dbde);
  background: linear-gradient(315deg, #fc00aa, #00dbde);
  min-height: 100vh;
}
.elementsrow {
  display: flex;
  flex-direction: row;
}
</style>
