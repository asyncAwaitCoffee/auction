<template>
    <section class="home-page">
        <div class="p0">
            <article class="text-left">
                <h3>Hello and welcome to my Auction website!</h3>
                <p>This site is a practice ground for new skills and implementations.</p>
                <p>Please allow a few seconds for the web service to wake up and load data.</p>
                <p>You can sign up or use a pre-created account { test : 123 }.</p>
                <p>Have a great day!</p>
            </article>
            <article class="text-right">
                <h3>Stack used:</h3>
                <p>Vue.js | Express.js | Socket.io | PostgreSQL</p>
            </article>
        </div>  
        <div class="p1">
            <div class="p3">
                <p><span>L</span>orem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus dolore deleniti officia cupiditate ut architecto at quae, alias magni impedit dicta amet exercitationem ipsum recusandae minus a porro atque ipsam!</p>
            </div>
            <div class="p3">
                <p><span>L</span>orem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus dolore deleniti officia cupiditate ut architecto at quae, alias magni impedit dicta amet exercitationem ipsum recusandae minus a porro atque ipsam!</p>
            </div>
            <div class="p3">
                <p><span>L</span>orem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus dolore deleniti officia cupiditate ut architecto at quae, alias magni impedit dicta amet exercitationem ipsum recusandae minus a porro atque ipsam!</p>
            </div>
        </div>
    </section>
</template>
    
<script>
    
</script>
    
<style>
    .home-page {
        height: 100%;
        width: 100%;
        display: flex;
        flex-flow: row;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: flex-start;
        padding: 100px 100px 0 100px;
        gap: 50px;

        @media screen and (max-width: 1200px) {
            padding: 20px 20px 0 20px;
        }
    }
    
    article {
      padding: 10px;
      font-size: clamp(12px, 2vmin, 30px);
      background-color: var(--color-one);
    }

    article p {
        margin-top: 5px;
    }

    .text-left {
        padding-left: 20px;
        border-top: 4px solid var(--color-four);
        border-left: 4px solid var(--color-four);
    }

    .text-right {
        text-align: right;
        padding-right: 20px;
        border-right: 4px solid var(--color-four);
        border-bottom: 4px solid var(--color-four);
    }

    .p0 {
        width: 100%;
        display: flex;
        flex-flow: column;
    }

    .p1 {
        width: 40%;
        display: flex;
        flex-flow: column;
        flex-wrap: nowrap;
        align-content: space-around;
        justify-content: flex-start;
        gap: 20px;

        @media screen and (max-width: 1200px) {
            width: 100%;
            flex-flow: row;
        }
    }

    .p3 {
        width: 100%;
        padding: 5px;
        font-size: clamp(10px, 1.6vmin, 20px);
        text-indent: 10px;
        text-align: justify;
        text-justify: inter-word;
      background-color: var(--color-one);
    }

    .p3 span {
        font-weight: bold;
        font-size: clamp(14px, 3vmin, 28px);
    }
</style>