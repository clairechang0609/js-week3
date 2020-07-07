let app = new Vue({
    el: '.wrap',
    data: {
        products: [
            {
                id: 1586934917210,
                category: 'lighting',
                title: '夜巡桌燈',
                origin_price: 10000,
                price: 8500,
                description: '直徑 13.5 x 高 24.5 公分',
                content: '手把不僅方便移動，同時也是美感造型之一。可以作為床頭燈、情境燈、或是取代蠟燭光源，營造浪漫氛圍。',
                is_enabled: true,
                imageUrl: 'https://shoplineimg.com/5cd8dc7015c0710001011ee2/5d5bc7beb19ace0014165345/800x.webp?source_format=jpg',
                unit: '盞',
                options: {
                    brand: 'MENU'
                }
            }, {
                id: 1196934917910,
                category: 'lighting',
                title: '封光吊燈',
                origin_price: 11900,
                price: 10000,
                description: '直徑 32.5 x 高 29.5 公分',
                content: '防眩光的霧面燈罩，不僅能夠照亮您的餐桌或是吧台，也能散發柔和的光線，溫暖整個空間。',
                is_enabled: true,
                imageUrl: 'https://shoplineimg.com/5cd8dc7015c0710001011ee2/5d86c7208f9bfc3ebeef30c4/800x.webp?source_format=jpg',
                unit: '盞',
                options: {
                    brand: 'Muuto'
                }
            }
        ],
        editProduct: {
            options: {},
        },
        newProduct: true
    },
    methods: {
        openModal(mode, item) {
            switch (mode) {
                case 'new': //新增商品
                    this.newProduct = true;
                    this.editProduct = {
                        options: {
                            brand: '',
                        }
                    };
                    document.querySelector('.form-wrap').classList.add('show');
                    break;
                case 'edit': //編輯
                    this.newProduct = false;
                    this.editProduct = JSON.parse(JSON.stringify(item)); //因添加options需深層複製
                    document.querySelector('.form-wrap').classList.add('show');
                    break;
                case 'delete': //刪除
                    this.editProduct = Object.assign({}, item);
                    document.querySelector('.delete-alert').classList.add('show');
            }
            document.querySelector('html').classList.add('shadow');
        },
        updateProduct () { //確認新增商品
            if (this.newProduct){ //新商品
                this.editProduct.id = new Date().getTime();
                this.products.push(this.editProduct);
            } else {
                this.products.forEach((item, i) => {
                    if (item.id === this.editProduct.id) {
                        this.products[i] = this.editProduct;
                    }
                });
            }
            this.editProduct = { options: {}, };
            document.querySelector('.form-wrap').classList.remove('show');
            document.querySelector('html').classList.remove('shadow');
        },
        deleteProduct() { //確認刪除
            this.products.forEach((item, i) => {
                if (item.id === this.editProduct.id) {
                    this.products.splice(i, 1);
                }
            });
            this.editProduct = { options: {}, };
            document.querySelector('.delete-alert').classList.remove('show');
            document.querySelector('html').classList.remove('shadow');
        },
        closeForm() { //取消編輯
            document.querySelector('.form-wrap').classList.remove('show');
            document.querySelector('html').classList.remove('shadow');
            this.editProduct = { options: {}, };
        },
        cancelDelete() { //取消刪除
            document.querySelector('.delete-alert').classList.remove('show');
            document.querySelector('html').classList.remove('shadow');
            this.editProduct = { options: {}, };
        }
    }
})