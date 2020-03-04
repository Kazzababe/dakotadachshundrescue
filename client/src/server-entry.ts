import { createApp } from './main';
import App from './App.vue';

export default async (context: any): Promise<App> => {
    const { app, router } = createApp(context.state);

    await router.push(context.url);

    await new Promise((resolve, reject): void => {
        router.onReady((): void => {
            const matchedComponents = router.getMatchedComponents();
            if (!matchedComponents.length) {
                return reject({ code: 404 });
            }
            resolve();
        }, reject);
    });

    return app;
};
