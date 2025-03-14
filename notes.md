## 02 - React Native Basics [COURSE GOALS APP]

### 002 Exploring Core Components & Component Styling

React Native компилирует компоненты в соответствующие нативные элементы. Например:
`<View> = <div> = android.View = UIView`
В нём нельзя использовать DOM-элементы.
Соответственно, когда мы создаём свои компоненты - мы просто создаём комбинации Основных компонентов React Native и других встроенных компонентов.
CSS не существует в React Native. Можно использовать:

- inline styles
- StyleSheet Objects
  Это всё пишется на JS. И хотя эти стили основаны на CSS, они включают в себя лишь часть существующих свойств и параметров.

### 003 Working With Core Components

Текст нельзя напрямую помещать в `<View></View>`.
`<View>` используется для того, чтобы вмещать в себя другие компоненты и размещать их каким-то образом.
`<Text>` используется для того, чтобы выводить текст.
Одна из особенностей React Native - это то, что что все основные компоненты нужно импортировать из `"react-native"`
`<Button title="smth"/>` кнопка - это самозакрывающийся тэг. Текст внутри неё прописывается в атрибуте `title`.

### 004 Styling React Native Apps

В целом, стили можно прописывать не только в `const styles = StyleSheet.create({})`, но и в обычном объекте. Но StyleSheet выдаёт нам подсказки, автозаполнение, и выводит ошибки и предупреждения.

### 008 Using Flexbox To Create Layouts

Flexbox по умолчанию применяется ко всем `<View>`, и они по умолчанию `flexDirection: "column",`

### 010 Improving The Layout

У компонента <Button/> нет пропа `style`, так что мы не можем его стилизовать. Но можно создать свою собственную кнопку.

### 011 Handling Events

Для обработки событий в React Native используются свои обработчики. Например, для `TextInput` используется `onChangeText`. Этот обработчик передаст введённое значение в предоставленную ему функцию автоматически.
`console.log()` Выведет значение в консоль, где запущен процесс `npm run start`
Для `Button` используется обработчик событий `onPress`

### 013 iOS & Android Styling Differences

Иногда одни и те же стили выглядят по-разному на разных платформах, потому что они конвертируются в разные нативные элементы. Например, на Андроиде `<Text>` может иметь скруглённые углы, а на iOS - нет. Поэтому там, где эти углы нам всё же необходимы, нужно использовать `<View>`. Другие стили также могут отличаться. это нужно перепроверять и уточнять в документации.

В отличие от обычного CSS, в React Native стилях стили не имеют каскадности и не наследуются дочерними элементами.

### 015 Optimizing Lists with FlatList

`<ScrollView>` всегда рендерит всё, что в нём есть и не очень подходит для списков, т.к. это может тормозить приложение, если дочерних элементов слишком много. Его можно использовать для чего-то вроде длинной статьи.
Для списков же лучше использовать `<FlatList>`, который будет рендерить только элементы в поле видимости и будет подгружать элементы вне экрана используя lazy-loading.
Но если в `<ScrollView>` мы просто помещаем контент ммежду открывающим и закрывающим тэгами (и используем `list.map((el) => <View>smth...</View>)`), то `<FlatList>` должен получить два пропа:

```
  <FlatList
    data={<массив данных>}
    renderItem={(itemData) => {
      return (
        <View style={styles.goalItem}>
          <Text style={styles.goalText}>{itemData.item.text}</Text> // сами данные лежат в .item
        </View>
      );
    }}
  />
```

И хотя мы открыто не прописываем проп `key`, всё-таки он нужен `FlatList`-у. Поэтому лучше всего передавать в него не просто массив данных, а массив объектов вида

```
  {
    key= 12345,
    text: 'smth'
  }

```

, откуда FlatList самостоятельно возьмёт `key`. И, соответственно, нужно брать не просто `item`, а `item.text`.

Но если по какой-то причине нам так делать неудобно, можно просто добавить к `FlatList` ещё один проп, который извлечёт `key` таким образом, которым мы ему укажем:

```
  keyExtractor={(item, index) => {
    return item.id;
  }}
```

### 019 Handling Taps with the Pressable Component

Для компонентов, на которые пользователь будет нажимать, нужно использовать компонент `Pressable`. Есть старые компоненты `Touchable`, но они уже устаревают и лучше их не использовать.

### 021 Adding an Android Ripple Effect & an iOS Alternative

На Андроиде можно добавить специальный эффект при нажатии на `Pressable`, используя проп `android_ripple`. В нём можно прописать цвет, который наложится на элемент при нажатии.
На iOS такого нет. Зато вместо этого можно использовать особые стили по условию:

```
  <Pressable
    android_ripple={{ color: "#000000" }}
    onPress={onDeleteItem}
    style={({ pressed }) => pressed && styles.pressedItem} // стиль pressedItem применится только в тот момент, когда элемент будет нажат.
  >
  </Pressable>
```

### 022 Adding a Modal Screen

Хотя добавить стили элементу `<Button/>` мы и не можем, но можно установить ей проп `color`.

### 023 Styling the Modal Overlay

Ещё стиль кнопок можно немного поменять, если обернуть их во `View` и стилизовать его. Так, например, можно повлиять на размер кнопок и внешние отступы.

### 025 Working with Images & Changing Colors

Чтобы вставлять изображения, нужно использовать компонент `<Image />`. Но путь до картинки нужно указывать не напрямую, а через испорт при помощи `require`:

```
<Image source={require("../assets/images/goal.png")} />
```

### 026 App Finishing Touches

Если нам ужно установить один и тот же фон для всего приложения, его нужно прописать в `app.json` вот так:

```
"backgroundColor": "#1e085a",
```

и тогда его не придётся прописывать для каждого экрана (но для модалок, тем не менее, указывать фон нужно).

Чтобы поменять цвет статус-бара, нужно использовать специальный компонент и указать в нём строкой нужный стиль:

```
<StatusBar style="light" /> // light / dark / inverted / auto
```

## 03 - Debugging React Native Apps (Introduction)

### 002 Handling Errors - 005 Using the React DevTools

Ways to debug a React Native App:

1. Посмотреть лог ошибок в терминале (там выводится и место возникновения ошибки, и причина).
2. Посмотреть ошибку в попапе в приложении Expo Go.
3. console.log()
4. Использовать JS debugger (в меню разработчика) (Ctrl+m чтобы открыть меню ИЛИ нажать "j" в терминале чтобы открыть debugger)
5. Использовать React DevTools, установив их глобально командой `npm install -g react-devtools`. Использовать команду `react-devtools`, а затем из developer menu в expo go зайти в JS debugger - там запустятся React DevTools.

## 04 - Diving Deeper into Components, Layouts & Styling - Building a Mini-Game App

### 003 Setting Up our Screen Components

Для создания экранов можно создать папку "screens" - это не обязательно, но удобно.

### 005 Styling for Android & iOS

Для создания тени на андроиде мы можем использовать

```
  elevation: 4,
```

Чем больше число - тем "выше" элемент и тем больше тень.
А для iOS нужно использовать набор свойств "shadow":

```
  shadowColor: "black",
  shadowOffset: { width: 0, height: 2 }, // тень сдвинута вниз на 2 пикселя
  shadowRadius: 6,
  shadowOpacity: 0.25,
```

### 006 Styling the Number Input Element

Длину вводимого значения в инпут можно ограничить при помощи `maxLength`:

```
  <TextInput maxLength={2} />
```

### 007 Configuring the TextInput Field

Для инпута можно установить тип клавиатуры, которую он будет открывать, а также много других настроек:

```
  <TextInput
    maxLength={2}
    keyboardType="number-pad"
    autoCapitalize="none"
    autoCorrect={false}
  />
```

### 011 Adding a Linear Gradient

Добавлять градиенты через стили нельзя. Для этого нужно установить специальный пакет:

```
  expo install expo-linear-gradient
```

А затем использовать компонент:

```
import { LinearGradient } from "expo-linear-gradient";

  <LinearGradient
    colors={["#4e0329", "#ddb52f"]}
  >
      something here...
  </LinearGradient>
```

### 012 Adding a Background Image

Фоновое изображение нужно добавлять через специальный компонент:

```
  <ImageBackground
    source={require("./assets/images/background.png")}
    resizeMode="cover"
    style={styles.rootScreen} // стили фонового элемента
    imageStyle={styles.backgroundImage} // стили самой картинки
  >
    <элемент, позади которого будет изображение>
  </ImageBackground>
```

### 014 Handling User Input & Showing an Alert Dialog

В React Native есть специальный объект `Alert`, у которого есть методы `.prompt()` и `.alert()`, которые позволяют показывать окошко с предупреждениями

### 017 Respecting Device Screen Restrictions with the SafeAreaView

Чтобы контент приложения не наползал на статус бар, нужно использовать компонент `SafeAreaView`. Ещё, если он не работает, можно прибегнуть к хаку со стилями и подставить в `marginTop` высоту статус бара:

```
  rootScreen: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
```

### 025 Working with Icons (Button Icons)

Expo предоставляет свою библиотеку иконок `@expo/vector-icons`, которой очень просто пользоваться. Ничего дополнительно устанавливать не нужно:

```
  import { Ionicons } from "@expo/vector-icons";
  ...
  <Ionicons name="remove" size={24} color="white" />
```

Список иконок можно найти на их сайте.

### 026 Adding & Using Custom Fonts with React Native Apps

Для работы со шрифтами лучше всего использовать библиотеку:

```
expo install expo-font
```

Также можно использовать библиотеку `expo-google-fonts` для того, чтобы совсем просто пользоваться шрифтами гугла.

Используются шрифты так (всё происходит в App.js):

```
import { useFonts } from "expo-font";


const [fontsLoaded] = useFonts({
  "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
  "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
});

if (!fontsLoaded) {
  return <AppLoading />;
}
```

Для показа индикатора загрузки можно использовать библиотеку

```
expo install expo-app-loading
```

которая и предоставит компонент `<AppLoading />`

### 028 Using & Styling Nested Text

`<Text>` может содержать в себе компонент `<Text>` , но не может содержать в себе компонент `<View>`.
`<Text>` расположенный внутри другого `<Text>` унаследует его стили.

## 05 - Building Adaptive User Interfaces (Adapt to Platform & Device Sizes)

### 003 Introducing the Dimensions API

Для адаптива можно использовать

```
import { Dimensions } from "react-native";
```

Это объект с информацией. Например, можно получить информацию про ширину экрана вот так:

```
const deviceWidth = Dimensions.get("window").width;
```

В .get можно передать "window" или "screen". На iOS разницы нет. На android screen это весь доступный экран, а window - доступный экран минус статус бар.
Полученное значение можно использовать в стилях, чтобы установить разные значения размеров элементов в зависимости от размера экрана:

```
const styles = StyleSheet.create({
  numberText: {
    fontSize: deviceWidth < 380 ? 28 : 36,
  },
});

```

### 005 Understanding Screen Orientation Problems

В файле app.json можно зафиксировать ориентацию экрана:

```
"orientation": "portrait", // или "landscape" или "default" для переключения между режимами
```

Для динамического пересчёта размеров на основании ширины/высоты при повороте экрана мы не можем просто использовать `const deviceHeight = Dimensions.get("window").height;`, потому что это значение считается только один раз и не пересчитывается при повороте экрана.

Вместо этого нужно использовать хук `import { useWindowDimensions } from "react-native";`, внутри компонента использовать его

```
const { width, height } = useWindowDimensions();

const marginTopDistance = height < 361 ? 10 : 100;
```

и применить стили к элементу `<View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>`: тогда каждый раз при смене размеров экрана значение будет пересчитываться.

### 007 Managing Screen Content with KeyboardAvoidingView

На iOS при клике на инпуте в ландшафтном режиме клавиатура перекрывает часть экрана и не закрывается. Чтобы это решить, нужно использовать следующие компоненты:

```
import {
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
...
  <ScrollView style={styles.screen}>
    <KeyboardAvoidingView style={styles.screen} behavior="position">
      <наш контент, который теперь будет сдвигаться вверх при открытии клавиатуры, его можно будет скроллить и при клике на который будет закрываться клавиатура.>
    </KeyboardAvoidingView>
  </ScrollView>
```

### 010 Writing Platform-specific Code with the Platform API

На React Native можно писать разный код для разных платформ.

```
import { Platform } from "react-native";

// .OS === android / ios /  macos / web / windows
borderWidth: Platform.OS === "android" ? 2 : 0
ИЛИ
borderWidth: Platform.select({ ios: 0, android: 2 }),
```

Также можно создавать разные файлы для разных платформ. Для этого достаточно создать два файла, например: `Title.android.js` и `Title.ios.js`, а в местах импорта использовать общее название: `import Title from "../components/ui/Title";`. React Native использует подходящий файл в зависимости от платформы. Разными могут быть файлы не только файлы компонентов, но и, например, файлы с переменными.

## 06 - React Native Navigation with React Navigation [MEALS APP]

### 004 Displaying Items in a Grid

`<FlatList>` может выводить элементы в несколько колонок. Для этого нужно добавить ему проп `numColumns={число_колонок}`

### 005 Getting Started with the React Navigation Package

Для того, чтобы добавить в приложение навигацию, нужно установить пакет:

```
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
```

Затем в App.js обернуть всё приложение в соответствующий компонент:

```
import { NavigationContainer } from "@react-navigation/native";
export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Something />
      </NavigationContainer>
    </>
  );
}

```

Для того, чтобы начать пользоваться навигацией, нужно установить навигатор. Навигатор - это один из способов навигации (табы, выдвижной элемент и т.д.)

```
npm install @react-navigation/native-stack
```

А затем нам нужно вне компонента создать компонент навигатора и уже в приложении использовать его:

```
const Stack = createNativeStackNavigator();
...
export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="MealsCategories" component={CategoriesScreen} />
          <Stack.Screen name="MealsOverview" component={MealsOverviewScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
```

### 006 Implementing Navigation Between Two Screens

Каждый компонент, который используется в качестве `Stack.Screen`, автоматом получает проп `navigation`
И там мы в нужном нам месте можем просто вызвать переход на нужный нам экран с указанием его имени:

```
onPress={() => navigation.navigate("MealsOverview");}
```

### 007 Setting the Default Screen

Установить экран по умолчанию можно двумя способами:

1. Просто установить экран первым в списке
2. Указать название экрана по умолчанию: `<Stack.Navigator initialRouteName="ProductDetails">`

### 008 Understanding the useNavigation Hook

Вообще есть два навигатор типа стэк: Stack и Native Stack. Но Native Stack использует нативные технологии, а Stack их просто имитирует. Так что Native Stack предпочтительнее и производительнее. Но в некоторых случаях, если с Native Stack есть какие-то проблемы, можно попробовать использовать Stack.

Проп navigation получает только экран, который будет открыт навигацией. Чтобы избежать prop drilling-а и не передавать глубоко внутрь navigation, можно использовать хук в любом компоненте:

```
import { useNavigation } from "@react-navigation/native";

...

const navigation = useNavigation();
```

### 009 Working with Route Parameters To Pass Data Between Screens

Каждый экран помимо пропа `navigation` получает ещё и проп `route`.
`route` содержит в себе информацию касательно текущего рута. В том числе, объект `params`, который мы определяем, когда прописываем навигацию: `navigate('SomeScreen', {anyKey: 'any info here!'})`

Точно так же как и с `navigation`, мы можем не только в самом экране получить `route` как проп, но и мы можем его получить из любого другого внутреннего компонента при помощи хука:

```
import { useRoute } from "@react-navigation/native";

...

const route = useRoute();
```

### 012 Styling Screen Headers & Backgrounds

При использовании навигации автоматом создаётся определённый вид у экранов. изменить его можно, добавив в `<Stack.Screen />` проп `options={{ title: "All Categories" }}`. Это установит стили для одного экрана.
Если же есть стили, которые мы хотим применять везде - их мы должны прописать выше, в `StackNavigator`

```
<Stack.Navigator
  screenOptions={{
    headerStyle: { backgroundColor: "#24180f" },
    headerTintColor: "#ffffff",
    contentStyle: { backgroundColor: "#3f2f25" },
  }}
>
```

### 013 Setting Navigation Options Dynamically

Также можно динамически настраивать экран используя автоматически передаваемые экрану `route` и `navigation`:

```
  <Stack.Screen
    name="MealsOverview"
    component={MealsOverviewScreen}
    options={({ route, navigation }) => {
      const catId = route.params.categoryId;
      const category = CATEGORIES.find((cat) => cat.id === catId);

      return {
        title: category.title,
        headerStyle: { backgroundColor: category.color },
      };
    }}
  />
```

И ещё есть второй вариант. В компоненте экрана мы автоматом получаем `navigation` и при помощи него задаём опции экрана:

```
export default function MealsOverviewScreen({ route, navigation }) {
  const categoryId = route.params.categoryId;

  // useEffect(() => {
  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find((cat) => cat.id === categoryId).title;

    navigation.setOptions({
      title: categoryTitle,
    });
  }, [categoryId, navigation]);
}
```

Обязательно нужно устанавливать опции в useEffect-е, потому что иначе они будут перевычисляться при каждом ререндере, а нам это не нужно. Более того: обычный useEffect выполняется когда компонент уже отрендерился, и иногда это заметно (в данном случае, название экрана выводится не сразу, а с некоторой задержкой). В таком случае помогает использовать useLayoutEffect - он оптимизирует работу эффекта и срабатывает быстрее.

### 015 Outputting Content in the Meal Detail Screen

При использовании изображений из интернета, для `Image` необходимо указывать высоту и ширину, потому что для не локальных картинок React Native не может определить их размер.

### 017 Adding Header Buttons

В хедер, созданный автоматически, мы можем подсунуть свои элементы. Вот так:

```
<Stack.Screen
  name="MealDetail"
  component={MealDetailScreen}
  options={{
    headerRight: () => {
      return <Button title="Tap me!" />;
    },
  }}
/>
```

Либо, как и в случае с другими опциями, можно этот элемент установить из самого компонента экрана при помощи useLayoutEffect и navigation / useNavigation
Т.е. в headerRight/headerLeft нужно передать функцию, возвращающую JSX

### 020 Configuring the Drawer Navigator & The Drawer

Для того, чтобы в качестве навигации использовать drawer, достаточно устнаовить необходимые пакеты и использовать его по аналогии со Stack:

```
npm install @react-navigation/drawer

npx expo install react-native-gesture-handler react-native-reanimated

...

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            headerStyle: { backgroundColor: "#3c0a6b" },
            headerTintColor: "white",
          }}
        />
        <Drawer.Screen name="User" component={UserScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

```

И так же, как и со Stack-ом, можно через опции поменять внешний вид у Drawer-а.

И так же, как и со Stack-ом, экраны получают пропы route и navigation. И с экранов, например, можно открывать Drawer:

```
navigation.toggleDrawer();
```

### 021 Adding, Configuring & Using Bottom Tabs

Ещё один способо навигации - табы. Их есть несколько видов. Самый универсальный - `Bottom Tabs`.

```
npm install @react-navigation/bottom-tabs
```

### 022 Nesting Navigators

Разные навигаторы можно совмещать и комбинировать между собой, чтобы получить необходимую структуру приложения.
Для этого вместо того, чтобы в Stack.Screen передавать обычный реакт компонент, нужно в него передать другой навигатор со своими экранами.

### 006 Getting Started with Redux & Redux Toolkit

Для глобального управления стейтом приложения можно использовать как useContext, так и Redux. Т.е. мы создаём контекст / стор и оборачиваем приложение в соответствующий провайдер.

## 09 - Handling User Input

### 004 Configuring the Form Input Elements

Важно помнить, что у компонента `<TextInput />` по умолчанию стоят пропы `autoCapitalize="sentences"` и `autoCorrect={true}` так что при необходимости их нужно отключить.

## 10 - Sending Http Requests

### 004 Sending POST Http Requests

Для взаимодействия с бэкендом удобно использовать библиотеку axios. Если при том ещё использовать firebase - то можно сделать всё совсем просто. Firebase предоставляет ссылку, по которой можно отправлять запрос. А запро при помощи axios формируется так:

```
import axios from "axios";

export function storeExpense(expenseData) {
  axios.post(
    "<link_from_firebase>/<node_name>.json",
    expenseData
  );
}

```

## 11 - User Authentication

### 003 How Does Authentication Work

Authentications works quite simple. We've got our app and a backend API. User's credentials are sent to the backend with a http request. On the backend they are validated. Then a unique authentication token is generated. Then the token is sent back to the app. The token is stored on the device. On the phone we check for the token to confirm that authentication was successful. And this token is sent with all future http requests to confirm the validity of the request.

### 005 Controlling Signup & Login Screens

Для того, что перейти с одного экрана на другой в Stack навигаторе, но при этом убрать кнопку "Назад" и полностью заменить один экран другим, можно использовать метод replace: `navigation.replace("OtherScreen");`

### 014 Accessing Protected Resources

В Firebase можно включить защиту для данных. Например, можно запретить доступ к БД для неавторизованных пользователей. Для этого нужно просто в правилах прописать следующее:

```
{
  "rules": {
    ".read": "auth.uid != null",
    ".write": "auth.uid != null",
  }
}
```

В таком случае ко всем нашим запросам как на чтение, так и на запись БД нужно будет прилагать токен авторизации. Иначе запросы не будут проходить.

### 015 Storing Auth Tokens on the Device & Logging Users In Automatically

Для хранения токена на устройстве можно использовать библиотеку AsyncStorage. Её нужно установить `npm install @react-native-async-storage/async-storage` и использовать вот так:

```
  // сохранить токен
  AsyncStorage.setItem("token", "any string here");


  // получить токен
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        setAuthToken(storedToken);
      }
    }

    fetchToken();
  }, []);


  // удалить токен
  AsyncStorage.removeItem("token");
```

### 008 Adding & Configuring the Camera Package (for Native Camera Access)

В expo есть пакет, который позволяет использовать всю функциональность каемры на полную: expo-camera. В нём можно настраивать очень много всего. Но для более простого взаимодействия с камерой достаточно использовать пакет попроще: expo-image-picker, который позволяет использовать камеру + просматривать фото на телефоне

## 12 - Using Native Device Features (Camera, Location & More)

### 026 SQLite Getting Started & Initialization

Для хранения данных на устройстве можно использовать expo SQLite:

```
npx expo install expo-sqlite
...

import * as SQLite from "expo-sqlite";
const database = SQLite.openDatabase("places.db");
```

SQLite.openDatabase автоматически определит, существует ли такая БД. Если есть - откроет её. Если нет - создаст.

Ещё нужно создать само наполнение БД. Например, так:

```
export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          address TEXT NOT NULL,
          lat REAL NOT NULL,
          lng REAL NOT NULL
         )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}
```

Эта функция попытается создать таблицу places. Если получится - разрешит promise. Если нет - вернёт ошибку.

## 13 - Building React Native Apps Without Expo

### 002 How Exactly Does Expo Work

Особенности Expo:

- Можно использовать Expo Go, которое автоматически запускает наш код. Код не нужно собирать и публиковать.
- Во время разработки реальное приложение не собирается. Вместо этого исходный код встраивается в клиент Expo Go и выполняется там. Тем не менее, можно собрать и опубликовать независимое приложение.
- Для того, чтобы собрать приложение, можно использовать EAS Build Service. Получается, что у нас как бы 2 версии приложения:
  - во время разработки: быстрая работа с Expo Go, моментальное отображение изменений
  - для продакшена: независимое приложение, не требующее Expo Go, которое может быть собрано для любой платформы

### 003 Expo Alternatives

При разработке при помощи expo мы инициализируем проект так:

```
expo init RNCourse
```

При этом есть три разных варианта создания проекта на React native:

- Expo "Managed Workflow"
  - Easy to set up & work with
  - Quick & frictionless development
  - No or very little configuration required
  - You can build (cross-platform) standalone apps
- Expo "Bare Workflow"
  - Is used when we need more control. For example, when we need to write our own native code in Swift, Objective-C, Android or Kotlin, and mix that with our React Native code.
  - Relatively easy to set up & work with
  - Convenient development
  - Can't use Expo Go because native code won't work
  - Some configuration required
  - You can build cross-platform standalone apps
  - Basically you control more, but there are also more things that you have to do.
- React Native CLI
  - More complex setup
  - Convenient development
  - Can require more configuration effort, especially with native device features
  - Standalone apps are built locally (so, for example, you can't build for iOS on Windows)

### 004 Setting Up Our System

Для того, чтобы просмотреть приложение, сделанное на Expo Bare Workflow, придётся сначала собирать приложение, и только потом просматривать его на устройстве.

### 005 Using Expo's Bare Workflow

Чтобы использовать Bare Workflow, нужно следовать инструкции на сайте React Native. Нужно подготовить своё устройство: установить Node, JDK, Android Studio и т.д.

```
expo init
> minimal
```

Такой проект будет иметь две папки - android и ios, в которых нужно будет вручную поправить конфигурацию, что сложнее, чем это делается в Managed Workflow (там эти настройки просто прописываются в app.json).
Затем нужно будет собрать приложение:

```
npm run android
```

Первоначальная сборка может занимать довольно много времени. Последующие изменения в коде собираться будут быстрее.
В целом запущенное таким образом приложение (в эмуляторе или на реальном подключённом устройстве) всё равно будет замечать изменения в коде и показывать их сразу.
Можно также собрать приложение для iOS:

```
npm run ios
```

Каждый раз при установке новых пакетов нужно перезапускать этот процесс.

### 007 Ejecting To The Bare Workflow

Также можно изначально работать в Managed Workflow, а затем переключиться на Bare Workflow. Для этого достаточно выполнить команду `expo eject`.При выборе identifier-а нужно указать что-то вроде обратного url и в конце указать название проекта, например: "com.academind.rncourse"

## 14 - Publishing React Native Apps

### 002 Publishing Apps An Overview

Есть два варианта публикации приложения на React Native:

- С Expo (Managed / Bare Workflow)
  - Нужно подготовить конфигурацию проекта
  - Создать двоичные файлы приложения при помощи Expo's Cloud Service. Плюс этого состоит в том, что сборка будет происходить не на своём локальном устройстве, а на серверах Expo, которые смогут собрать версии приложения подо все платформы (чего, например, нельзя сделать локально на Windows - приложение под iOS не соберётся)
  - Отправить приложение в магазины приложений (вручную либо при помощи сервиса Expo)
- Без Expo
  - Нужно подготовить конфигурацию проекта
  - Локально создать двоичные файлы приложения
  - Вручную отправить приложение в магазины приложений

### 003 Key Configuration Items & Considerations

Подготовка конфигурации проекта:

1. Разрешения

- На андроиде в магазине приложений будут показаны и запрошены требуемые разрешения

2. Название приложение и его идентификатор

- Указывается видимое имя приложения, версия приложения и уникальный идентификатор.

3. Переменные окружения

- Безопасно сохраняются переменные для всего приложения (например, API ключи)

4. Иконки и Splash Screen.

### 004 Configuring App Names & Versions

Для конфигурации важны следующие поля в app.json:

- name - Видимое имя приложения
- version - видимая пользователю версия приложения. Имеет смысл её менять при больших изменениях в коде.
- ios.buildNumber и android.versionCode - скрытые версии приложения, необходимые для того, чтобы сторы отличали версии приложения друг от друга. Эти версии могут отличаться от version. При этом для андроида должна быть целым положительным числом (1, 2, 3 и т.д.)
- orientation - ориентация экрана
- splash - Splash Screen
- icon - иконка приложения
- updates - используется, когда нужно конфигурировать и публиковать обновления без публикации новой версии в магазинах приложений.

### 005 A Quick Note About Environment Variables

Важно помнить, что в expo есть специальный функционал для работы с переменными окружения и с их хранением. Всё есть в официальной документации.

### 006 Adding Icons & A Splash Screen

Для того, чтобы создать иконку и Splash Screen, достаточно заменить соответствующие файлы в папке assets, использовав файлы с правильным форматом и разрешением. Подробности об этом есть в документации. Удобство состоит в том, что загрузить достаточно всего по одно версии иконки и Splash Screen-а, а о создании остальных иконок для разных устройств позаботится уже expo.

### 007 Building Expo Apps with EAS

Для того, чтобы опубликовать своё приложение, нужно:

0. Зарегистрироваться в Expo EAS
1. Установить EAS CLI
   `npm install -g eas-cli`
2. Залогиниться в аккаунт
   `eas login`
3. Сделать конфигурацию проекта
   `eas build:configure`
4. Если нужно создать для начала просто .apk - то нужно добавить в eas.json Следующие настройки:

```
 "preview": {
    "android": {
      "buildType": "apk"
    },
    "distribution": "internal"
  },
```

4.1. Собрать приложение
eas build -p android --profile preview

4.2. Указать id приложения в формате com.<companyname>.<appname>
4.3 Скачать .apk по предоставленной ссылке и радоваться🎉 5. Если нужно подготовить приложение для загрузки в магазин приложений - нужно настроить "production" в eas.apk. и собрать его при помощи `eas build --platform android`. Это создаст файл с расширением .aab, готовый к загрузке в магазин приложений.
Также нужно будет создать аккаунт разработчика на каждой из платформ.

## 15 - Push Notifications

### 002 What are (Local) Notifications

Локальные уведомления вызываются установленным приложением для локального устройства. Они не отправляются ни другим пользователям, ни на другие устройства. При этом уведомления планируются, доставляются и управляются на одном устройстве, без использования сервера.

### 003 Adding the Expo Notification Package

Для уведомлений используется пакет expo-notifications

### 004 Scheduling Notifications - 006 Handling Incoming Notifications

Для того, чтобы использовать локальные уведомления,
нужно:

1. импортировать пакет:
   `import * as Notifications from "expo-notifications";`
2. внутри <App /> или другого компонента запланировать уведомление:

```
  function scheduleNotificationHandler() {
    requestPermissionsAsync();

    Notifications.scheduleNotificationAsync({
      content: {
        title: "My first local notification",
        body: "This is the body of the notification",
        data: { userName: "Sophie" },
      },
      trigger: {
        seconds: 2,
      },
    })
      .then((response) => console.log(response))
      .catch((error) => console.log("error", error));
  }

  async function requestPermissionsAsync() {
    return await Notifications.requestPermissionsAsync();
  }
```

3. Вне <App /> настроить управление уведомлениями, без которого уведомления не будут отображаться:

```
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});
```

### 008 Reacting To Incoming Notifications

Для того, чтобы отреагировать на полученное пользователем уведомление, нужно в useEffect-е выполнить следующее:

```
  useEffect(() => {
  const receivedSubscription = Notifications.addNotificationReceivedListener(
  (notification) => {
      <сделать что-то здесь>
    }
  );

    return () => {
      receivedSubscription.remove();
    };

  }, []);
```

Данные, которые мы прикрепляли к уведомлению, находятся в `notification.request.content.data`.

При этом желательно потом эту подписку на событие получения уведомления очистить, чтобы не случилось утечки памяти.

### 009 Reacting To User Interaction With Incoming Notifications

Также можно реагировать на тап по уведомлению:

```
  useEffect(() => {
    const responseSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        <какая-то реакция на тап по уведомление>
      });

    return () => {
      responseSubscription.remove();
    };
  }, []);
```

Внутри response придёт объект, содержащий дополнительные данные + те же данные, что и от addNotificationReceivedListener.
Например, переданные данные можно найти в `response.notification.request.content.data`

### 010 Understanding Push Notifications

Пуш уведомления существуют для того, чтобы отправлять уведомления, либо с бэкенда на устройства, либо с одного устройства на другое (но всё равно через бэкенд).
Бэкенд в данном случае - это некий сервер, управляющий пуш-уведомлениями (например, такой предоставляет Expo). И тут есть два варианта отправки пуш уведомления:

1. Код на бэке отправляет запрос на сервер пуш-уведомлений
2. Приложение отправляет запрос на сервер пуш-уведомлений

А далее уже сам сервер отправит пуш-уведомление на соответствующие устройства.

### 011 Push Notifications Setup

Для того, чтобы использовать пуш-уведомления, нужно создать уникальный токен при помощи

```
  useEffect(() => {
    Notifications.getExpoPushTokenAsync({projectId}).then((pushTokenData) =>
      console.log(pushTokenData)
    );
  }, []);
```

projectId можно получить на expo.dev на странице проекта.
