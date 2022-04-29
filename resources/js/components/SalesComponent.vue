<template>
  <div>
    <el-row>
      <el-col :span="6">
        <div class="grid-content bg-purple scrollx">
          <article class="itemlist">
            <!-- <header>
              <h1 class="header__title">
                <span class="header__title--top">Veterinaria</span>
                <span class="header__title--bottom">C: Salomon Sanchez</span>
              </h1>
            </header> -->
            <main class="itemlist__container">
              <article
                class="itemlist__item"
                v-for="item in items"
                :key="item.name"
                @click="itemClick(item)"
              >
                <img :src="item.image" class="itemlist__picture" />
                <span class="itemlist__name">{{ item.name }}</span>
                <span class="itemlist__price">
                  {{ formatPrice(item.price) }}
                </span>
              </article>
            </main>
          </article>
        </div>
      </el-col>
      <el-col :span="18">
        <el-row>
          <el-col :span="20">
            <div>
              <el-input
                placeholder="Buscar"
                v-model="inputSearch"
                clearable
              ></el-input>
            </div>
          </el-col>
          <el-col :span="4">
            <el-button @click="search">Search</el-button>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="Producto" name="first">
                <div class="block">
                  <el-image
                    style="width: 320px;"
                    :src="selectedItem ? selectedItem.image : ''"
                  >
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>

                Cantidad:
                <el-input-number
                  size="small"
                  v-model="num"
                  controls-position="right"
                  @change="onCantChanged"
                  :min="1"
                  :max="1000"
                ></el-input-number>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="small"
                ></el-button>
              </el-tab-pane>
              <el-tab-pane label="Favoritos" name="second">
                <file-upload
                  ref="uploader"
                  :onSelected="onSelected"
                  :onPreview="onPreview"
                  action="/file/upload"
                ></file-upload>

                <el-row
                  v-if="selectedFile"
                  type="flex"
                  align="middle"
                  style="text-align: center;"
                >
                  <el-col :span="24">
                    <img id="preview" style="width: 256px;" />
                  </el-col>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  mounted() {
    console.log('Component mounted.')
  },
  data() {
    return {
      items: [
        {
          index: 0,
          name: 'Jaula',
          image:
            'https://http2.mlstatic.com/D_NQ_NP_802768-MLM46356969261_062021-O.webp',
          price: 1500,
        },
      ],
      num: 1,
      selectedItem: null,
      selectedFile: null,
      activeName: 'first',
      inputSearch: '',
      fileList: [
        {
          name: 'food.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        },
        {
          name: 'food2.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        },
      ],
    }
  },
  methods: {
    search() {
      let $this = this
      axios
        .get(`/api/search?kw=${this.inputSearch}`)
        .then(function (response) {
          console.log(response)
        })
        .catch((error) => {
          console.error(error)
        })
    },
    onCantChanged(value) {
      this.items = this.items.filter((s) => s.name != this.selectedItem.name)
      for (let i = 0; i < value; i++) {
        this.items.push({
          index: this.items.length + 1,
          name: this.selectedItem.name,
          price: this.selectedItem.price,
          image: this.selectedItem.image,
        })
      }
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].index = i + 1
      }
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `El límite es 3, haz seleccionado ${
          files.length
        } archivos esta vez, añade hasta ${files.length + fileList.length}`,
      )
    },
    onSelected(file) {
      this.selectedFile = file

      // size 1Mb
      if (this.selectedFile.size > 1000000) {
        this.$alert(
          'Tamaño excedido, la imagen debe ser menor a 1 Mb',
          'Error',
          {
            confirmButtonText: 'OK',
            type: 'error',
          },
        )

        // invalid size
        this.selectedFile = null
      }
    },
    onPreview(imgData) {
      $('#preview').attr('src', imgData)
    },
    itemClick(e) {
      this.selectedItem = e
      this.num = this.items.filter((s) => s.name == e.name).length
      console.log(e)
    },
  },
}
</script>
<style style lang="scss">
.itemlist {
  max-width: 490px;
  width: 100%;
  border-radius: 12px;
  font-family: 'Source Sans Pro', sans-serif;

  header {
    --start: 15%;
    height: 130px;
    background: rgb(255, 0, 0);
    color: #fff;
    position: relative;
    border-radius: 14px 12px 0 0;
    overflow: hidden;

    .header__title {
      position: absolute;
      z-index: 2;
      top: 50%;
      right: calc(var(--start) * 0.75);
      transform: translateY(-50%);
      text-transform: uppercase;
      margin: 0;

      span {
        display: block;
      }

      &--top {
        font-size: 24px;
        font-weight: 700;
        letter-spacing: 6.5px;
      }

      &--bottom {
        font-size: 13px;
        font-weight: 500;
        letter-spacing: 3.55px;
        opacity: 0.65;
        transform: translateY(-2px);
      }
    }
  }

  &__container {
    padding: 15px;
    display: grid;
    row-gap: 8px;
  }

  &__item {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    align-items: center;
    padding: 5px 15px 5px 5px;
    overflow: hidden;
    border-radius: 0px;
    box-shadow: 0 5px 7px -1px rgba(51, 51, 51, 0.23);
    cursor: pointer;
    transition: transform 0.25s cubic-bezier(0.7, 0.98, 0.86, 0.98),
      box-shadow 0.25s cubic-bezier(0.7, 0.98, 0.86, 0.98);
    background-color: #fff;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 9px 47px 11px rgba(51, 51, 51, 0.18);
    }
  }

  &__picture {
    width: 32px;
    border-radius: 50%;
    box-shadow: 0 0 0 6px #ebeef3, 0 0 0 11px #f3f4f6;
  }

  &__name {
    color: #979cb0;
    font-weight: 400;
    font-size: 16px;
    margin-left: -32px;
  }

  &__price {
    color: #979cb0;
    font-weight: 400;
    font-size: 16px;
    text-align: right;
    margin-right: 0px;
  }
}

.scrollx {
  height: 720px;
  overflow: auto;
  margin-right: 15px;
  border-right: 1px solid #DCDFE6;
}
</style>
