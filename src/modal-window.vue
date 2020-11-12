<template>
    <div v-if="show" class="modal-shadow" @click.self="closeModal" style = "
    position: absolute;
        top: 40px;
        left: 0;
        min-height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.39);
    ">
        <div class="modal" style = "
        background: #fff;
        border-radius: 8px;
        padding: 15px;
        min-width: 420px;
        max-width: 480px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        ">
            <div class="modal-close" @click="closeModal" style = "
            border-radius: 50%;
            color: #fff;
            background: #2a4cc7;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 7px;
            right: 7px;
            width: 30px;
            height: 30px;
            cursor: pointer;
            ">&#10006;</div>
            <slot name="title" style = "color: #0971c7;">
                <h3 class="modal-title">Your photo</h3>
            </slot>
            <slot name="body">
                <div class="modal-content" style = "margin-bottom: 20px">
                    <img v-bind:src="photo" @click="closeModal">
                </div>
            </slot>
            <slot name="footer">
                <div class="modal-footer">
                    <button class="modal-footer__button" @click="closeModal" style = "
                    background-color: #0971c7;
                color: #fff;
                border: none;
                text-align: center;
                padding: 8px;
                font-size: 17px;
                font-weight: 500;
                border-radius: 8px;
                min-width: 150px;
                    ">
                        Ок
                    </button>
                </div>
            </slot>
        </div>
    </div>
</template>
 
<script>
    export default {
        name: "ModalWindow",
        data: function () {
            return {
                show: false,
                photo:''
            }
        },
        methods: {
            closeModal: function () {
                this.show = false
            }
        }
    }
</script>