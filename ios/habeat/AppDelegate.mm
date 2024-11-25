#import "AppDelegate.h"
#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import <React/RCTRootView.h>
#import <React/RCTBundleURLProvider.h>
#import <RNKakaoLogins.h>

@interface AppDelegate () <RCTBridgeDelegate>
@end

@implementation AppDelegate

// kakao
- (BOOL)application:(UIApplication *)app
     openURL:(NSURL *)url
     options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
 if([RNKakaoLogins isKakaoTalkLoginUrl:url]) {
    return [RNKakaoLogins handleOpenUrl: url];
 }
 return NO;
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
    RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge moduleName:@"habeat" initialProperties:nil];

    rootView.backgroundColor = [[UIColor alloc] initWithWhite:1.0 alpha:1.0];
    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    UIViewController *rootViewController = [UIViewController new];
    rootViewController.view = rootView;
    self.window.rootViewController = rootViewController;
    [self.window makeKeyAndVisible];
    return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge {
    #if DEBUG
        return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
    #else
        return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
    #endif
}

@end
