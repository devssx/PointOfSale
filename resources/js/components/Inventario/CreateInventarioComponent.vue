<template>
  <el-col :span="5">
    <el-button
      v-if="!hidden"
      type="primary"
      icon="el-icon-circle-plus"
      @click="dialogVisible = true"
      style="float: right;"
    >
      Registrar Inventario
    </el-button>
    <el-dialog
      title="Registar Inventario"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-row>
        <el-col :span="24">
          <el-form
            :label-position="labelPosition"
            :rules="rules"
            :model="item"
            label-width="150px"
            ref="inventarioForm"
          >
            <el-form-item label="Nombre" prop="nombre">
              <el-input v-model="inventario.nombre"></el-input>
            </el-form-item>
          </el-form>
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
      dialogVisible: false,
      labelPosition: 'left',
      loading: false,
      inventario: {
        nombre: '',
      },
      rules: {
        nombre: [
          {
            required: true,
            message: 'Campo nombre es obligatorio',
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
    handleClose(done) {
      var $this = this
      if ($this.inventario.nombre) {
        $this
          .$confirm('¿Estas seguro de no guardar el inventario?')
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
      this.$refs.inventarioForm.resetFields()
    },
    save() {
      var $this = this
      $this.$refs.inventarioForm.validate((valid) => {
        if (valid) {
          $this.loading = true
          axios
            .post('/user/newUser', $this.user)
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
                message: 'El inventario fue agregado correctamente',
                type: 'success',
              })

              $this.$root.$emit('onNewItemCreated', response.data)
              $this.$root.$emit('refreshTable')
              $this.cancel()
            })
            .catch((error) => {
              if (error.response.data.errors) {
                var errors = error.response.data.errors
                console.error(errors)
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
