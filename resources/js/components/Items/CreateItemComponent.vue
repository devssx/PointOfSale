<template>
  <el-col :span="5">
    <el-button
      v-if="!hidden"
      type="primary"
      icon="el-icon-circle-plus"
      @click="dialogVisible = true"
      style="float: right;"
    >
      Registrar Producto
    </el-button>
    <el-dialog
      title="Registar Producto"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <el-row>
        <el-col :span="24">
          <el-form
            :label-position="labelPosition"
            :rules="rules"
            :model="item"
            label-width="150px"
            ref="itemForm"
          >
            <el-form-item label="Nombre" prop="nombre">
              <el-input v-model="item.nombre"></el-input>
            </el-form-item>
            <el-form-item label="Código" prop="codBar">
              <el-input v-model="item.codBar"></el-input>
            </el-form-item>
            <el-form-item label="Familia" prop="familia">
              <el-input v-model="item.familia"></el-input>
            </el-form-item>
            <el-form-item label="Descripción" prop="descripcion">
              <el-input type="textarea" v-model="item.descripcion" maxlength="500" :rows="2" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="Especificación" prop="especificacion">
              <el-input type="textarea" v-model="item.especificacion" maxlength="500" :rows="2" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="Precio" prop="precio">
              <el-input v-model="item.precio"></el-input>
            </el-form-item>
            <el-form-item label="Máximos" prop="maximos">
              <el-input v-model="item.maximos"></el-input>
            </el-form-item>
            <el-form-item label="Minimos" prop="minimos">
              <el-input v-model="item.minimos"></el-input>
            </el-form-item>
            <el-form-item label="Imágen" prop="image">
              <el-col :span="21">
                <el-input v-model="item.image"></el-input>
              </el-col>
              <el-col :span="3">
                <file-upload
                  ref="uploader"
                  :onSelected="onSelected"
                  :onPreview="onPreview"
                  action="/file/upload"
                ></file-upload>
              </el-col>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
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
      <el-row
        v-if="!selectedFile && item.image != ''"
        type="flex"
        align="middle"
        style="text-align: center;"
      >
        <el-col :span="24">
          <el-image style="width: 256px;" :src="item.image"></el-image>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">Cancelar</el-button>
        <el-button type="primary" @click="save()" :loading="loading">
          Guardar
        </el-button>
      </span>
    </el-dialog>
  </el-col>
</template>
<script>
export default {
  props: ['hidden'],
  data() {
    return {
      selectedFile: null,
      dialogVisible: false,
      labelPosition: 'left',
      loading: false,
      item: {
        nombre: '',
        codBar: '',
        familia: '',
        descripcion: '',
        especificacion: '',
        precio: 0,
        maximos: 0,
        minimos: 0,
        stock: 0,
        favorito: 0,
        image: '',
      },
      rules: {
        nombre: [
          {
            required: true,
            message: 'Campo nombre es obligatorio',
            trigger: 'change',
          },
        ],
        codBar: [
          {
            required: true,
            message: 'Campo código es obligatorio',
            trigger: 'change',
          },
        ],
        precio: [
          {
            required: true,
            message: 'Campo precio es obligatorio',
            trigger: 'change',
          },
        ],
        precio: [
          {
            required: true,
            number: true,
            min: 0.1,
            message: 'Precio debe ser un numero mayor a 0.1',
            trigger: 'change',
          },
        ],
        maximos: [
          {
            required: true,
            number: true,
            min: 1,
            message: 'Máximos debe ser un numero mayor a 0',
            trigger: 'change',
          },
        ],
        minimos: [
          {
            required: true,
            number: true,
            min: 1,
            message: 'Minimos debe ser un numero mayor a 0',
            trigger: 'change',
          },
        ],
      },
    }
  },
  methods: {
    showDialog(item) {
      this.dialogVisible = true
    },
    onSelected(file) {
      this.selectedFile = file
      this.item.image = this.selectedFile.name

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
        this.item.image = ''
      }
    },
    onPreview(imgData) {
      $('#preview').attr('src', imgData)
    },
    handleClose(done) {
      var $this = this
      if ($this.item.codBar) {
        $this
          .$confirm('¿Estas seguro de no guardar el producto?')
          .then((_) => {
            $this.cancel()
            done()
          })
          .catch((_) => {})
      } else {
        $this.cancel()
        done()
      }
    },
    cancel() {
      this.dialogVisible = false
      this.loading = false
      this.$refs.itemForm.resetFields()
      this.selectedFile = null
    },
    save() {
      var $this = this
      $this.$refs.itemForm.validate((valid) => {
        //console.log($this.selectedFile);
        if (valid) {
          $this.loading = true

          if ($this.selectedFile) {
            // upload a file
            $this.$refs.uploader.submit(
              (imgServerPath) => {
                // success
                $this.item.image = imgServerPath
                $this.pushData()
              },
              (error) => {
                console.log(error)
                $this.$notify({
                  title: 'Error!',
                  message:
                    'Ha ocurrido un error al intentar subir la imagen, intenta con otra',
                  type: 'error',
                })

                $this.loading = false
              },
            )
          } else {
            $this.pushData()
          }
        } else {
          return false
        }
      })
    },
    pushData() {
      var $this = this
      $this.$refs.itemForm.validate((valid) => {
        if (valid) {
          $this.loading = true
          axios
            .post('/api/newItem', $this.item)
            .then(function (response) {
              if (response.data.error) {
                $this.$alert(response.data.error, 'Error', {
                  confirmButtonText: 'OK',
                  type: 'error',
                })
                $this.loading = false
                return
              }

              $this.$notify({
                title: '¡Exito!',
                message: 'El producto fue agregado correctamente',
                type: 'success',
              })

              $this.$root.$emit('onNewItemCreated', response.data)
              $this.$root.$emit('refreshTable')
              $this.cancel()
            })
            .catch((error) => {
              if (error.response.data.errors) {
                var errors = error.response.data.errors
                $this.$alert(errors[Object.keys(errors)[0]][0], 'Error', {
                  confirmButtonText: 'OK',
                  type: 'error',
                })
              }
              $this.loading = false
            })
        } else {
          return false
        }
      })
    },
  },
}
</script>
