import Vue from 'vue';
import Vuex from 'vuex';
import {getAdminInfo} from '@/api/getData'

Vue.use(Vuex);

const state = {
    adminInfo: {
        avatar: 'default.jpg'
    }
}

const mutations = {
    saveAdminInfo(state, adminInfo){
        console.log("adminInfo:", adminInfo)
        state.adminInfo = adminInfo;
    }
}

const actions = {
    async getAdminInfo({commit}){
        console.log("getAdminInfo")
        try{
            const res = await getAdminInfo()
            if(res.error_code === 0){
                commit('saveAdminInfo', res.info);
            }else{
                throw new Error(res.error_type);
            }
        }catch(err ){
            
        }
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})