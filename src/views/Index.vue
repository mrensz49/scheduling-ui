<template>

    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
    <CNavbar color-scheme="light" class="bg-light">
        <CContainer fluid>
            <CNavbarBrand href="#" class="ms-5">
                <img src="@/assets/images/logo/calendar-clock.png" :height="50" alt="logo">
                <small style="font-size:12px"><b>rScheduling</b></small>
            </CNavbarBrand>
            <CForm class="d-flex me-5 ms-5">
                <a href="javascript:void(0)" class="text-decoration-none me-2" @click="handleRegisterLink()" style="color:#3C6C9C">Register</a>
                <a href="javascript:void(0)" class="text-decoration-none" @click="handleLoginLink()" style="color:#3C6C9C">Login</a>
            </CForm>
        </CContainer>
    </CNavbar>

    <section class="section-big main-color">
    <div class="container">

        <div class="row">
            <div class="col-md-12 pb-20 text-center">
                <h2 class="section-title mb-10">rScheduling</h2>
                <p class="section-sub-title">
                    This tool helps with tasks like gathering data, creating reports, setting schedules, and compiling monthly reports.<br>
                    It doesn't replace any organizational guidelines for the secretary or other users. <br>
                    All records, cards, and forms provided by the organization must be maintained as instructed.
                </p>
                <div class="exp-separator center-separator">
                    <div class="exp-separator-inner"></div>
                </div>

            </div>
        </div>

        <div class="row">
            <div class="col-md-4">
                <ul class="i-list medium">
                <li class="i-list-item">
                    <div class="icon"> <i class="fa fa-desktop"></i> </div>

                    <div class="icon-content">
                        <h3 class="title">Dashboard</h3>
                        <p class="sub-title">
                            Provide the number of brothers and sisters, meeting attendance, and relevant statistics.
                        </p>
                    </div>
                    <div class="iconlist-timeline"></div>
                </li>
                <li class="i-list-item">
                    <div class="icon"> <i class="fa fa-code"></i> </div>

                    <div class="icon-content">
                        <!-- Easy &amp; Clean Code -->
                        <h3 class="title">Field Service</h3>
                        <p>
                            Automate the calculation of monthly totals for various ministry-related reports, including hours, BS, and other relevant form of ministry.
                        </p>
                    </div>
                    <div class="iconlist-timeline"></div>
                </li>
                <li class="i-list-item">
                    <div class="icon"> <i class="fa fa-paper-plane"></i> </div>

                    <div class="icon-content">
                        <h3 class="title">Contact</h3>
                        <p>
                            rschedulingreport@gmail.com
                        </p>
                    </div>
                </li>
                </ul>
            </div>
            <div class="col-md-4">
                <ul class="i-list medium">
                <li class="i-list-item">
                    <div class="icon"> <i class="fa fa-diamond"></i> </div>
                    <div class="icon-content">
                        <h3 class="title">Midweek</h3>
                        <p class="sub-title">
                            Efficiently manage student assignments, including Bible Reading, Talks, R.V., and other activities.
                        </p>
                    </div>
                    <div class="iconlist-timeline"></div>
                </li>
                <li class="i-list-item">
                    <div class="icon"> <i class="fa fa-recycle"></i> </div>
                    <div class="icon-content">
                        <h3 class="title">Meeting Attendance</h3>
                        <p>
                            Record the attendance of all members of the congregation at every midweek and weekend meeting.
                        </p>
                    </div>
                    <div class="iconlist-timeline"></div>
                </li>
                <li class="i-list-item">
                    <div class="icon"> <i class="fa fa-mobile fa-lg"></i> </div>
                    <div class="icon-content">
                        <h3 class="title">Notification</h3>
                        <p>
                            Brothers and sisters will get phone alerts for midweek meeting assignments.<br>
                            Monthly field service report reminders for elders or assistant.
                        </p>
                    </div>
                </li>
                </ul>
            </div>
            <div class="col-md-4">
                <ul class="i-list medium">
                <li class="i-list-item">
                    <div class="icon"> <i class="fa fa-codepen"></i> </div>
                    <div class="icon-content">
                        <h3 class="title">Statistic</h3>
                        <p class="sub-title">
                            Show comprehensive statistics on the total number of hours and Bible studies for each group.
                        </p>
                    </div>
                    <div class="iconlist-timeline"></div>
                </li>
                <li class="i-list-item">
                    <div class="icon"> <i class="fa fa-newspaper-o"></i> </div>
                    <div class="icon-content">
                        <h3 class="title">Reports</h3>
                        <p>
                            Create reports on basic publisher information, active and inactive publishers, service years, and other relevant data.
                        </p>
                    </div>
                    <div class="iconlist-timeline"></div>
                </li>
                <li class="i-list-item">
                    <div class="icon"> <i class="fa fa-check"></i> </div>
                    <div class="icon-content">
                        <h3 class="title">Sample Feature</h3>
                        <p>
                           Click <a href="javascrpit:void" @click="showVideo()">here</a> to watch.
                        </p>
                    </div>
                </li>
                </ul>
            </div>

        </div>

        <div class="exp-separator center-separator">
            <div class="exp-separator-inner"></div>
        </div>

        <div class="row justify-content-md-center mt-5 mb-5">
            <div class="col-md-8 pb-20 ">
                <CCard>
                    <CCardBody>
                        <CCarousel controls indicators transition="crossfade" class="carousel-dark">
                            <CCarouselItem>
                                <img class="d-block w-100" src="@/assets/images/guest/dashboard-2.png" alt="slide 1"/>
                            </CCarouselItem>
                            <CCarouselItem>
                                <img class="d-block w-100" src="@/assets/images/guest/setup_midweek-2.png" alt="slide 2"/>
                            </CCarouselItem>
                            <CCarouselItem>
                                <img class="d-block w-100" src="@/assets/images/guest/field_service_report-2.png" alt="slide 3"/>
                            </CCarouselItem>
                            <CCarouselItem>
                                <img class="d-block w-100" src="@/assets/images/guest/statistic-2.png" alt="slide 4"/>
                            </CCarouselItem>
                            <CCarouselItem>
                                <img class="d-block w-100" src="@/assets/images/guest/sms-alert.png" alt="slide 5"/>
                            </CCarouselItem>                             
                        </CCarousel>
                    </CCardBody>
                </CCard>
            </div>
        </div>


        <div class="row justify-content-md-center">
            <div id="midweek-vid" class="col-md-8 mb-5 d-none" >
                <div class="exp-separator center-separator mb-5">
                    <div class="exp-separator-inner"></div>
                </div>
                <CCard>
                    <CCardBody>
                        <center>
                            <video width="1000" controls>
                                <source src="@/assets/videos/Midweek.mp4" type="video/mp4">
                                Your browser does not support HTML video.
                            </video>
                        </center>
                    </CCardBody>
                </CCard>
            </div>
        </div>

    </div>
    </section>
</template>

  <script>
    export default {
        name: 'Index',

        methods: {

            showVideo() {
                var element = document.getElementById("midweek-vid");
                element.classList.remove("d-none");
                window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
            },

            handleRegisterLink() {
              this.$router.push('/auth/register')
            },

            handleLoginLink() {
                this.$router.push('/auth/login')
            },
        }
    }

  </script>

<style scoped>

    body{margin-top:20px;}
    /* --------------------------------------------
        ICON LIST
    -------------------------------------------- */

    ul.i-list {
    padding-left: 0;
    list-style: none;
    }

    ul.i-list .list-title {
    display: inline-block;
    position: absolute;
    }

    ul.i-list li {
    padding: 2px 0px;
    }

    ul.i-list i.fa {
    margin-right: 7px;
    }

    ul.i-list .list-item {
    margin-top: 3px;
    display: inline-block;
    }

    ul.i-list.filled i.fa {
    color: white;
    font-size: 9px;
    padding: 5px;
    border-radius: 50%;
    }

    ul.e-icon-list.filled li {
    padding: 2px 0px;
    line-height: 24px;
    }

    ul.i-list.underline li {
    padding: 6px 0px;
    border-bottom: 1px solid #eee;
    }

    ul.i-list.medium li {
    padding-bottom: 25px;
    position: relative;
    }

    ul.i-list.medium .icon {
    margin-right: 25px;
    color: white;
    font-size: 25px;
    text-align: center;
    line-height: 68px;
    width: 68px;
    height: 68px;
    border-radius: 50%;
    box-shadow: 0 5px 16px rgba(0,0,0,.28);
    position: relative;
    z-index: 1;
    /*background-image: url(../img/crease.svg) !important;
    -moz-background-size: 100% 100% !important;
    background-size: 100% 100% !important;
    background-position: center center !important;*/
    }

    ul.i-list.medium .icon i.fa {
    margin: 0;
    }

    ul.i-list.medium.bordered .icon {
    background: white;
    color: inherit;
    border: 2px solid #8fc135;
    font-size: 26px;
    color: #8fc135;
    position: relative;
    z-index: 1;
    box-shadow: 0 8px 22px rgba(0,0,0,.28);
    }

    ul.i-list.medium .list-item {
    text-transform: uppercase;
    }

    ul.i-list.large .icon {
    margin-right: 30px;
    background: #d0d0d0;
    color: white;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    box-shadow: 0 8px 22px rgba(0,0,0,.28);
    }

    ul.i-list.large .icon i.fa {
    margin: 0;
    }

    ul.i-list.large.bordered .icon {
    background: inherit;
    color: inherit;
    border: 2px solid #8fc135;
    font-size: 30px;
    color: #8fc135;
    }

    ul.i-list.large .list-item {
    text-transform: uppercase;
    }

    ul.i-list .icon {
    float: left;
    }

    ul.i-list.right {
    text-align: right;
    }

    ul.i-list.right .icon {
    float: right;
    }

    ul.i-list.right .icon {
    float: right;
    margin-right: 0;
    margin-left: 25px;
    }

    ul.i-list.large.right .icon {
    float: right;
    margin-right: 0;
    margin-left: 30px;
    }

    ul.i-list.large li {
    margin-bottom: 25px;
    }

    ul.i-list .icon-content {
    overflow: hidden;
    }

    ul.i-list .icon-content .title {
    margin-top: 5px;
    margin-bottom: 10px;
    }

    .left-line .iconlist-timeline {
    left: auto;
    right: 35px;
    }

    .iconlist-timeline {
    position: absolute;
    top: 1%;
    left: 32px;
    width: 1px;
    height: 99%;
    border-right-width: 1px;
    border-right-style: dashed;
    height: 100%;
    border-color: #ccc;
    }
    .icon{
            background-color: #0cb4ce;
    }
    separator, .testimonial-two, .exp-separator-inner {
        border-color: #0cb4ce;
    }
    .exp-separator {
        border-color: #0cb4ce;
        border-top-width: 2px;
        margin-top: 10px;
        margin-bottom: 2px;
        width: 100%;
        max-width: 55px;
        border-top-style: solid;
        height: auto;
        clear: both;
        position: relative;
        z-index: 11;
    }
    .section-sub-title {
        font-size: 18px;
        margin-bottom: 20px;
        font-weight: 400;
        font-family: Poppins;
    }
    .section-title {
        font-size: 32px;
        font-weight: 600;
        margin-top: 0.45em;
        margin-bottom: 0.35em;
        color: #303133;
        font-family: Poppins;
        letter-spacing: -0.02em;
    }
    .pb-20 {
        padding-bottom: 20px !important;
    }
    .text-center {
        text-align: center!important;
    }
    .center-separator .exp-separator-inner, .center-separator.exp-separator {
        margin-left: auto;
        margin-right: auto;
    }

    video {
        width: 100%;
        height: auto;
    }
</style>