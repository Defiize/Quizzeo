import { startUnleash } from 'unleash-client'

const ffUrl="https://gitlab.com/api/v4/feature_flags/unleash/36069767"
const ffServerKey="G1Zu8SauEaFduUS5WPKj"
async function initializeFfManager() {
    
    const ffManager = await startUnleash({
        url: ffUrl,
        appName: "development",
        instanceId: ffServerKey
    });
    ffManager.on('ready', () => console.log("feature flags manager ready..."));
    // optional error handling when using unleash directly
    ffManager.on('error', console.error);
    const isEnabled = (feature)=>{
        return ffManager.isEnabled(feature,{userId:"remy"})
    }
    return isEnabled
}

export {initializeFfManager}