<template>
  <el-col :span="5">
    <el-button
      v-if="!hidden"
      type="primary"
      icon="el-icon-circle-plus"
      @click="dialogVisible = true"
      style="float: right;"
    >
      Registrar Usuario
    </el-button>
    <el-dialog
      title="Registar Usuario"
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
            ref="userForm"
          >
            <el-form-item label="Nombre" prop="nombre">
              <el-input v-model="user.nombre"></el-input>
            </el-form-item>
            <el-form-item label="Contraseña" prop="password1">
              <el-input v-model="user.password1"></el-input>
            </el-form-item>
            <el-form-item label="Repetir Contraseña" prop="password2">
              <el-input v-model="user.password2"></el-input>
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
      user: {
        nombre: '',
        password1: '',
        password2: '',
      },
      rules: {
        nombre: [
          {
            required: true,
            message: 'Campo nombre es obligatorio',
            trigger: 'change',
          },
        ],
        password1: [
          {
            required: true,
            message: 'Campo contraseña es obligatorio',
            trigger: 'change',
          },
        ],
        password2: [
          {
            required: true,
            message: 'Campo repetir contraseña es obligatorio',
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
      if ($this.user.nombre) {
        $this
          .$confirm('¿Estas seguro de no guardar el usuario?')
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
      this.$refs.userForm.resetFields()
    },
    save() {
      var $this = this
      $this.$refs.userForm.validate((valid) => {
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
                message: 'El usuario fue agregado correctamente',
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
