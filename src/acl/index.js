import { createAcl, defineAclRules } from 'vue-simple-acl';
import EventService from "@/services/EventService.js";
import router from "../router";
  const rules = () => defineAclRules((setRule) => {

    EventService.fetchUserAccess()
    .then(response => {
        setRule(response.data, ()=>1);
    })
    .catch(() => {})

  });

  const simpleAcl = createAcl({
    // user, // short for user: user
    rules, // short for rules: rules
    router, // OPTIONAL, short for router: router
    onDeniedRoute: '/unauthorized'
    // other optional vue-simple-acl options here... See Vue Simple ACL Options below
  });

  export default simpleAcl;