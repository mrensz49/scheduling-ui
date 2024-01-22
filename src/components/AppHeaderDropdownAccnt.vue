<template>
  <CDropdown variant="nav-item">
    <CDropdownToggle placement="bottom-end" class="py-0" :caret="true" href="javascript:void(0)">
      <span class="me-2">{{ authStore.user?.name }}</span>
      <!-- <CAvatar :src="avatar" size="md" /> -->
      <CAvatar color="secondary" text-color="white" size="md" status="success">
        {{ showName(authStore.user?.name) }}
      </CAvatar>
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownHeader component="h6" class="bg-light fw-semibold py-2">
        Account
      </CDropdownHeader>
      <CDropdownItem>
        <CIcon icon="cil-bell"/> Updates
        <CBadge color="info" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem>
      <!-- <CDropdownItem>
        <CIcon icon="cil-envelope-open" /> Messages
        <CBadge color="success" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-task" /> Tasks
        <CBadge color="danger" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-comment-square" /> Comments
        <CBadge color="warning" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem> -->
      <CDropdownHeader component="h6" class="bg-light fw-semibold py-2">
        Settings
      </CDropdownHeader>
      <CDropdownItem class="pointer" @click="showProfile()">
          <CIcon icon="cil-user"/> Profile
      </CDropdownItem>
      <!-- <CDropdownItem> <CIcon icon="cil-settings" /> Settings </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-dollar" /> Payments
        <CBadge color="secondary" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-file" /> Projects
        <CBadge color="primary" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem>
      <CDropdownDivider />
      <CDropdownItem>
        <CIcon icon="cil-shield-alt" /> Lock Account
      </CDropdownItem> -->
      <CDropdownItem @click="authStore.handleLogout()" class="pointer"> <CIcon icon="cil-lock-locked"/> Logout </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>

<script setup>
  // import avatar from '@/assets/images/avatars/8.jpg'
  import router from '@/router'
  import { useAuthStore } from '@/store/auth'

  const authStore = useAuthStore()

  authStore.getUser()

  function showName(name) {
    if (name) {
      let n = name.split(' ')
      return n[0].slice(0,1)+n[1].slice(0,1)
    }
  }

  function showProfile() {
    router.push({name: 'Profile'})
  }
</script>
